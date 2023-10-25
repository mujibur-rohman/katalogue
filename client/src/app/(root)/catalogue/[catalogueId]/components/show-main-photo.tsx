/* eslint-disable @next/next/no-img-element */
import { TypePayloadProduct } from '@/actions/product';
import { fetcher } from '@/lib/api';
import axios, { CancelTokenSource } from 'axios';
import { useFormikContext } from 'formik';
import { Edit2Icon, RefreshCcwIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
  blobImg: string;
  imgFile: File | null;
  handleThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ShowMainPhoto({ blobImg, imgFile, handleThumbnail }: Props) {
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );
  const [errorUpload, setErrorUpload] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const formik = useFormikContext<TypePayloadProduct>();

  const uploadFile = async (file: File) => {
    try {
      setErrorUpload(false);
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const formData = new FormData();
      formData.append('thumbnail', file);
      const thumbnail = await fetcher.post<{
        id: number;
        fileName: string;
        url: string;
      }>('/thumbnail', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent) {
            const percentCompleted =
              (progressEvent.loaded / (progressEvent.total || 0)) * 100;
            if (percentCompleted <= 100) {
              setProgress(percentCompleted);
            }
          }
        },
        cancelToken: source.token,
      });
      formik.setFieldValue('thumbnailId', thumbnail.data.id);
    } catch (error: any) {
      setErrorUpload(true);
    }
  };

  useEffect(() => {
    if (imgFile) {
      uploadFile(imgFile);
    }
  }, [imgFile]);

  console.log(progress, blobImg);

  return (
    <div className="relative w-32 h-32 rounded-lg flex justify-center items-center bg-black overflow-hidden">
      <img
        src={blobImg}
        alt="main-photo"
        className="object-center group object-cover w-full h-full"
      />
      {progress < 100 ? (
        <div className="absolute bg-black/70 inset-0 flex justify-center items-center text-white text-sm">
          Loading {Math.floor(progress)}%
        </div>
      ) : (
        <div className="absolute opacity-0 transition-opacity hover:opacity-100 bg-black/70 inset-0 flex justify-center items-center text-white text-sm">
          <label
            htmlFor="thumbnail"
            className="bg-white rounded-full py-1 px-2 cursor-pointer"
          >
            <Edit2Icon className="w-4 text-black" />
          </label>
          <input
            onChange={handleThumbnail}
            type="file"
            id="thumbnail"
            className="hidden"
          />
        </div>
      )}
      {errorUpload ? (
        <div className="absolute bg-black/70 inset-0 flex justify-center items-center text-white text-sm">
          <div
            onClick={() => {
              if (imgFile) {
                uploadFile(imgFile);
              }
            }}
            className="bg-white rounded-full py-1 px-2 cursor-pointer"
          >
            <RefreshCcwIcon className="w-4 text-black" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ShowMainPhoto;
