import { getAllAttributes } from "@/actions/attribute";
import { PlusIcon } from "lucide-react";
import HeaderAttribute from "./components/header-attribute";
import React from "react";
import HeaderPage from "./components/header-page";

export default async function Attributes() {
  const attributes = await getAllAttributes();

  return (
    <React.Fragment>
      <div className="p-base">
        <HeaderPage />
        {!attributes.data.length ? (
          <div>Data Kosong</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {attributes.data.map((att) => (
              <div className="flex flex-col gap-3 p-3 border-[1px] rounded-lg">
                <HeaderAttribute attribute={att} />
                <div className="p-2 cursor-pointer hover:bg-gray-100 transition-colors flex gap-2 rounded-md border-[1px] font-light">
                  <PlusIcon className="text-gray-400" />
                  <span>Add New Attribute</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
