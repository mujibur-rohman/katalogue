/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {
  blobImg: string;
};

function ShowMainPhoto({ blobImg }: Props) {
  return (
    <div className=" w-32 h-32 rounded-lg flex justify-center items-center bg-black overflow-hidden">
      <img
        src={blobImg}
        alt="main-photo"
        className="object-center object-cover w-full h-full"
      />
    </div>
  );
}

export default ShowMainPhoto;
