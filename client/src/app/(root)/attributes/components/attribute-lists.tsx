"use client";

import {
  useCallback,
  experimental_useOptimistic as useOptimistic,
} from "react";
import HeaderAttribute from "./header-attribute";
import { PlusIcon } from "lucide-react";
import { TypeAttribute, deleteAttribute } from "@/actions/attribute";
import { useToast } from "@/lib/hooks/use-toast";

type Props = {
  attributes: {
    id: number;
    name: string;
  }[];
};

function AttributeLists({ attributes }: Props) {
  const [optimisticAttr, addOptimisticAttr] = useOptimistic(
    attributes,
    (state: TypeAttribute[], newAttr: TypeAttribute[]) => newAttr
  );
  const { toast } = useToast();

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const newAttr = attributes.filter((attr) => attr.id !== id);
        addOptimisticAttr(newAttr);
        await deleteAttribute(id);
        toast({
          variant: "success",
          title: "Delete Successfully",
          duration: 3000,
        });
      } catch (error: any) {
        addOptimisticAttr(attributes);
        console.log(error);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: error.message,
          duration: 3000,
        });
      }
    },
    [optimisticAttr]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      {optimisticAttr.map((att) => (
        <div
          key={att.id}
          className="flex flex-col gap-3 p-3 border-[1px] rounded-lg"
        >
          <HeaderAttribute attribute={att} handleDelete={handleDelete} />
          <div className="p-2 cursor-pointer hover:bg-gray-100 transition-colors flex gap-2 rounded-md border-[1px] font-light">
            <PlusIcon className="text-gray-400" />
            <span>Add New Attribute</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttributeLists;
