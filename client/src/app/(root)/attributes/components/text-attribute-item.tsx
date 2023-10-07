import React, { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { updateAttributeItem } from "@/actions/attribute-iitem";
import { motion } from "framer-motion";

type Props = {
  attrName: string;
  id: number;
  handleDelete: (id: number) => void;
};

export type Ref = HTMLDivElement;

// eslint-disable-next-line react/display-name
const TextAttributeItem = React.forwardRef<Ref, Props>(
  ({ attrName, handleDelete, id }, ref) => {
    const [value, setValue] = useState(attrName);
    const [isEdit, setIsEdit] = useState(false);
    const refEdit = useRef<HTMLInputElement | null>(null);
    const { toast } = useToast();

    const handleSave = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      try {
        e.preventDefault();
        setIsEdit(false);
        await updateAttributeItem({ name: value }, id);
      } catch (error: any) {
        setValue(attrName);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: error.message,
          duration: 2000,
        });
      }
    };
    return (
      <motion.div className="group flex gap-3 justify-between items-center hover:bg-gray-50 transition-colors p-2 border-[1px] rounded">
        <input
          ref={refEdit}
          className="w-full grow outline-none bg-transparent"
          type="text"
          value={value}
          readOnly={!isEdit}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        {!isEdit ? (
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <TrashIcon
                    onClick={() => {
                      handleDelete(id);
                    }}
                    type="button"
                    className="w-4 transition-opacity group-hover:opacity-100 opacity-0 text-destructive"
                    strokeWidth="1.25"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <EditIcon
                    onClick={() => {
                      setIsEdit(true);
                      if (refEdit.current) {
                        refEdit.current.focus();
                      }
                    }}
                    className="w-4 transition-opacity group-hover:opacity-100 opacity-0 text-blue-500"
                    strokeWidth="1.25"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        ) : (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-xs disabled:bg-blue-200 disabled:cursor-default text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        )}
      </motion.div>
    );
  }
);

export default TextAttributeItem;
