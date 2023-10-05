import { TypeAttributeItem } from "@/actions/attribute-iitem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditIcon, TrashIcon } from "lucide-react";

type Props = {
  item: TypeAttributeItem[];
};

async function BodyAttribute({ item }: Props) {
  return (
    <div className="h-full border-t-[1px] border-b-[1px] pt-2">
      {item.map((i) => (
        <span
          className="group flex justify-between items-center hover:bg-gray-50 transition-colors p-2 border-[1px] rounded"
          key={i.id}
        >
          {i.name}
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <TrashIcon
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
    </div>
  );
}

export default BodyAttribute;
