import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart2, ChevronRight, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function ListCatalogue({}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <div className="border-[1px] rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <span className="text-xl font-semibold">Title</span>
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex gap-2 rounded p-1 cursor-pointer">
                    <TrashIcon className="w-5" strokeWidth="1.25" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex gap-2 rounded p-1 cursor-pointer">
                    <EditIcon className="w-5" strokeWidth="1.25" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="border-t-[1px] py-2 px-4 flex justify-between items-center">
          <div className="flex items-end gap-2 text-gray-400">
            <div className="flex items-end">
              <span className="text-sm">10</span>
              <BarChart2 className="w-5" strokeWidth="1.25" />
            </div>
            <span className="text-sm">10 Product</span>
          </div>
          <Link
            href="/"
            className="text-blue-500 text-sm flex items-center underline"
          >
            More Details
            <ChevronRight className="w-5" strokeWidth="1.25" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListCatalogue;
