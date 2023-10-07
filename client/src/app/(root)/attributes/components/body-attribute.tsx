import {
  TypeAttributeItem,
  addAttributeItem,
  deleteAttributeItem,
} from "@/actions/attribute-iitem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  experimental_useOptimistic as useOptimistic,
} from "react";
import TextAttributeItem from "./text-attribute-item";

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
  const [readOnly, setReadOnly] = useState(true);
  const [addValue, setAddValue] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const refAdd = useRef<HTMLInputElement | null>(null);

  const handleDelete = async (id: number) => {
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
  };
  return (
    <div className="h-full border-t-[1px] flex flex-col gap-2 border-b-[1px] pt-2">
      {optimisticAttr.map((i) => (
        <span
          className="group flex gap-3 justify-between items-center hover:bg-gray-50 transition-colors p-2 border-[1px] rounded"
          key={i.id}
        >
          <TextAttributeItem readOnly={readOnly} attrName={i.name} />
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <TrashIcon
                    onClick={() => {
                      handleDelete(i.id);
                    }}
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
        </span>
      ))}
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
        className={cn("flex gap-2 mb-2", {
          "opacity-100 h-fit": showAdd,
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
        <button
          type="submit"
          disabled={addLoading}
          className="bg-blue-500 disabled:bg-blue-200 disabled:cursor-default text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </form>
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
