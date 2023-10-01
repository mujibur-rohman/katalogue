import React, { useRef, useState } from "react";
import { EditIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateAttribute } from "@/actions/attribute";
import { Modal } from "@/components/ui/modal";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  attribute: { id: number; name: string };
  handleDelete: (id: number) => Promise<void>;
};

function HeaderAttribute({ attribute, handleDelete }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [valueName, setNameValue] = useState(attribute.name);
  const { toast } = useToast();
  const ref = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsEdit(false);
      await updateAttribute({ name: valueName }, attribute.id);
    } catch (error: any) {
      setNameValue(attribute.name);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <Modal
        title="Delete Attribute"
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
                handleDelete(attribute.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <input
        ref={ref}
        value={valueName}
        type="text"
        onChange={(e) => {
          setNameValue(e.target.value);
          setIsEdit(true);
        }}
        className="text-xl text-foreground grow font-semibold outline-none"
        readOnly={!isEdit}
      />
      <AnimatePresence>
        {isEdit ? (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 100 }}
          >
            <Button type="submit" size="sm" className="">
              Save
            </Button>
          </motion.div>
        ) : (
          <TooltipProvider>
            <motion.div exit={{ opacity: 0 }} className="flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex gap-2 rounded p-1 cursor-pointer"
                    onClick={() => {
                      setModalDelete(true);
                    }}
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
                    className="flex gap-2 rounded p-1 cursor-pointer"
                    onClick={() => {
                      setIsEdit(true);
                      if (ref.current) {
                        ref.current.focus();
                        ref.current.select();
                      }
                    }}
                  >
                    <EditIcon className="w-5" strokeWidth="1.25" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </TooltipProvider>
        )}
      </AnimatePresence>
    </form>
  );
}

export default HeaderAttribute;
