import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, Link2 } from "lucide-react";
import React from "react";

type Props = {};

function AddCatalogue({}: Props) {
  return (
    <div className="p-base">
      <h1 className="inline-block mb-3 font-semibold text-lg">New Catalogue</h1>
      <form className="flex flex-col gap-4">
        <Input placeholder="Name" />
        <div className="flex gap-4">
          <Input placeholder="Slug" />
          <div className="border-[1px] w-full rounded overflow-hidden flex items-center gap-2 bg-white">
            <div className="p-2 bg-gray-100">
              <Link className="w-4" />
            </div>
            <span className="text-gray-500">https://google.com</span>
          </div>
        </div>
        <Textarea placeholder="Description" />
      </form>
    </div>
  );
}

export default AddCatalogue;
