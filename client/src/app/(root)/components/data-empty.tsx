/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

function DataEmpty({}: Props) {
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <img
          src="/assets/images/data-empty.png"
          alt="empty"
          className="w-[20rem]"
        />
        <span className="font-medium text-xl">Data Empty</span>
      </div>
    </div>
  );
}

export default DataEmpty;
