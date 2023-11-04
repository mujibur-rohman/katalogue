"use client";
import { useToast } from "@/lib/hooks/use-toast";
import { CopyIcon, LinkIcon } from "lucide-react";
import React from "react";

type Props = {
  url: string;
};

function CopyUrl({ url }: Props) {
  const { toast } = useToast();
  return (
    <div className="overflow-hidden w-full mt-5">
      <label className="font-semibold text-xl inline-block mb-2">
        Share you URL
      </label>
      <div className="border-[1px] rounded-lg flex items-center justify-between bg-white">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="p-2 bg-gray-100">
            <LinkIcon className="w-4 text-gray-500" />
          </div>
          <span className="text-gray-500 whitespace-nowrap overflow-hidden truncate">
            {url}
          </span>
        </div>
        <div
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              toast({
                variant: "success",
                description: "Copied",
                duration: 2000,
              });
              /* Resolved - text copied to clipboard successfully */
            } catch (err) {
              /* Rejected - text failed to copy to the clipboard */
            }
          }}
          className="px-2 cursor-pointer"
        >
          <CopyIcon className="w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default CopyUrl;
