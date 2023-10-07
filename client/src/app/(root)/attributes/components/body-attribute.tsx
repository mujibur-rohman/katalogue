import {
  TypeAttributeItem,
  addAttributeItem,
  deleteAttributeItem,
} from "@/actions/attribute-iitem";

import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import {
  useRef,
  useState,
  experimental_useOptimistic as useOptimistic,
  useCallback,
} from "react";
import TextAttributeItem from "./text-attribute-item";
import { AnimatePresence } from "framer-motion";

type Props = {
  item: TypeAttributeItem[];
  attributeId: number;
};

function BodyAttribute({ item, attributeId }: Props) {
  const [optimisticAttr, addOptimisticAttr] = useOptimistic(
    item,
    (state: TypeAttributeItem[], newAttr: TypeAttributeItem[]) => newAttr
  );
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const refAdd = useRef<HTMLInputElement | null>(null);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const newAttr = item.filter((attr) => attr.id !== id);
        addOptimisticAttr(newAttr);
        await deleteAttributeItem(id);
      } catch (error: any) {
        addOptimisticAttr(item);
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
    <div className="h-full border-t-[1px] flex flex-col gap-2 pt-2">
      <AnimatePresence mode="popLayout">
        {optimisticAttr.map((i) => (
          <TextAttributeItem
            key={i.id}
            handleDelete={handleDelete}
            id={i.id}
            attrName={i.name}
          />
        ))}
      </AnimatePresence>
      <form
        onSubmit={async (e) => {
          try {
            setAddLoading(true);
            e.preventDefault();
            if (addValue.trim()) {
              await addAttributeItem({
                attributeId,
                name: addValue,
              });
              setAddValue("");
              setShowAdd(false);
            }
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Add Failed",
              description: error.message,
              duration: 2000,
            });
          } finally {
            setAddLoading(false);
          }
        }}
        className={cn("flex gap-2", {
          "opacity-100 h-fit py-2": showAdd,
          "opacity-0 h-0": !showAdd,
        })}
      >
        <input
          value={addValue}
          onChange={(e) => {
            setAddValue(e.target.value);
          }}
          ref={refAdd}
          className="outline-none grow border-b-[1px]"
          type="text"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={addLoading}
            className="bg-blue-500 text-xs disabled:bg-blue-200 disabled:cursor-default text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAdd(false);
            }}
            className="bg-secondary text-xs disabled:cursor-default text-foreground px-2 py-1 rounded hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      {optimisticAttr.length ? (
        <hr />
      ) : (
        <span className="block text-center mb-3">Data Empty</span>
      )}
      <div
        onClick={() => {
          setShowAdd(true);
          if (refAdd.current) {
            refAdd.current.focus();
          }
        }}
        className="p-2 cursor-pointer text-blue-500 bg-blue-500/10 hover:bg-blue-100 transition-colors flex gap-2 rounded-md font-light"
      >
        <PlusIcon className="text-blue-500" />
        <span>Add New Attribute</span>
      </div>
    </div>
  );
}

export default BodyAttribute;
