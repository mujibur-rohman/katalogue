"use client";

import Image from "next/image";
import errorImg from "./../../public/assets/images/error-banner.png";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    console.error("sdd");
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <Image
        src={errorImg}
        alt="error"
        width={400}
        height={400}
        priority
        style={{ height: "auto", width: "auto" }}
      />
      <p className="my-5 text-2xl font-medium capitalize">{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
