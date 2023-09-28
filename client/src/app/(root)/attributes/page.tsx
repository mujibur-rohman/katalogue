"use client";
import { getAllAttributes } from "@/actions/attribute";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import HeaderAttribute from "./components/header-attribute";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";

export default async function Attributes() {
  const attributes = await getAllAttributes();
  const [openModal, setOpenModal] = useState(false);
  return (
    <React.Fragment>
      <Modal
        title="New Attributes"
        description="test"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <div className="p-base">
        <div className="mb-5 flex justify-between">
          <span className="text-2xl font-bold">Atrributes</span>
          <Button className="flex gap-2" onClick={() => setOpenModal(true)}>
            <PlusIcon className="text-background" />
            <span>Add Attribute</span>
          </Button>
        </div>
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
