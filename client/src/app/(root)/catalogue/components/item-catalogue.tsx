"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart2, ChevronRight, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { TypeCatalogue, deleteCatalogue } from "@/actions/catalogue";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";

type Props = {
  catalogue: TypeCatalogue;
};

function ItemCatalogue({ catalogue }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [modalDelete, setModalDelete] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteCatalogue(catalogue.id);
      toast({
        variant: "success",
        description: "Delete successfully",
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
        duration: 2000,
      });
    }
  };
  return (
    <div className="border-[1px] rounded-lg">
      <Modal
        title="Delete Catalogue"
        isOpen={modalDelete}
        onClose={() => {
          setModalDelete(false);
        }}
      >
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete?</p>
          <div className="self-end flex gap-3">
            <Button
              type="submit"
              variant="secondary"
              onClick={() => {
                setModalDelete(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => {
                setModalDelete(false);
                handleDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="p-4 flex justify-between items-center">
        <span className="text-xl font-semibold">{catalogue.name}</span>
        <TooltipProvider>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => {
                    setModalDelete(true);
                  }}
                  className="flex gap-2 rounded p-1 cursor-pointer"
                >
                  <TrashIcon className="w-5" strokeWidth="1.25" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => {
                    router.push(pathname + "/edit/" + catalogue.id);
                  }}
                  className="flex gap-2 rounded p-1 cursor-pointer"
                >
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
            <span className="text-sm">{catalogue.visitCount}</span>
            <BarChart2 className="w-5" strokeWidth="1.25" />
          </div>
          <span className="text-sm">{catalogue.products.length} Product</span>
        </div>
        <Link
          href={pathname + "/" + catalogue.id}
          className="text-blue-500 text-sm flex items-center underline"
        >
          More Details
          <ChevronRight className="w-5" strokeWidth="1.25" />
        </Link>
      </div>
    </div>
  );
}

export default ItemCatalogue;
