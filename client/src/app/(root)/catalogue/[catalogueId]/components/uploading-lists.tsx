import { TypePayloadProduct } from "@/actions/product";
import { fetcher } from "@/lib/api";
import { useToast } from "@/lib/hooks/use-toast";
import useValidationImage from "@/lib/hooks/use-validation-image";
import { cn } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";
import { useFormikContext } from "formik";
import { ImageIcon, RefreshCcwIcon, TrashIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  imgFile: File;
  blob: string;
  id: number;
  deletePhoto: (id: number) => void;
};

function UploadingLists({ blob, imgFile, id, deletePhoto }: Props) {
  const [idUpload, setIdUpload] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [cancelToken, setCancelToken] = useState<CancelTokenSource>();
  const { validateImage } = useValidationImage({
    extPermissions: ["image/jpg", "image/jpeg", "image/png", "image/PNG"],
    maxSize: 5000000,
  });
  const { toast } = useToast();

  const formik = useFormikContext<TypePayloadProduct>();

  const uploadFile = async (img: File) => {
    try {
      validateImage(img);
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const formData = new FormData();
      formData.append("photo", img);
      const response = await fetcher.post<{
        id: number;
        fileName: string;
        url: string;
      }>("photo-product", formData, {
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
      setIdUpload(response.data.id);
      if (formik.values.photos) {
        formik.setFieldValue("photos", [
          ...formik.values.photos,
          response.data.id,
        ]);
      } else {
        formik.setFieldValue("photos", [response.data.id]);
      }
    } catch (error: any) {
      setProgress(100);
      if (axios.isCancel(error)) {
        // @ts-ignore
        setErrorMsg(error.message);
        return;
      }
      if (error.response?.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.message);
      }
    }
  };
  useEffect(() => {
    if (imgFile) {
      uploadFile(imgFile);
    }
  }, []);

  return (
    <div className="border-b-[1px] pb-2">
      <div className="flex gap-2 items-center mb-2">
        <ImageIcon className="w-8 text-gray-400" />
        <span className="text-gray-500 whitespace-nowrap overflow-hidden truncate text-sm w-[99%]">
          {imgFile.name}
        </span>
        {progress === 100 && (
          <TrashIcon
            onClick={async () => {
              try {
                deletePhoto(id);
                if (idUpload) {
                  await fetcher.delete("/photo-product/" + idUpload);
                }
              } catch (error: any) {
                toast({
                  variant: "destructive",
                  description: error.message,
                  duration: 2000,
                });
              }
            }}
            className="w-5 text-red-400 cursor-pointer"
          />
        )}
        {progress < 100 && !errorMsg && (
          <XIcon
            onClick={() => {
              if (cancelToken) {
                cancelToken.cancel("upload cancel");
              }
            }}
            className="w-5 text-red-400 cursor-pointer"
          />
        )}
        {errorMsg && (
          <RefreshCcwIcon
            onClick={() => {
              setProgress(0);
              setErrorMsg("");
              uploadFile(imgFile);
            }}
            className="w-5 text-orange-400 cursor-pointer"
          />
        )}
      </div>
      <div className="relative h-1 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className={cn("absolute h-full left-0 transition-all", {
            "bg-blue-500": !errorMsg && progress < 100,
            "bg-green-500": !errorMsg && progress === 100,
            "bg-red-500": errorMsg,
          })}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress < 100 && !errorMsg && (
        <span className="text-xs">uploading {Math.floor(progress)}%</span>
      )}
      {progress === 100 && !errorMsg && (
        <span className="text-xs text-green-500">completed!</span>
      )}
      {errorMsg && <span className="text-xs text-destructive">{errorMsg}</span>}
    </div>
  );
}

export default UploadingLists;
