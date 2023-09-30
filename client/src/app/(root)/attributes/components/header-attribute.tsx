import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";

type Props = {
  attribute: { id: number; name: string };
  handleDelete: (id: number) => Promise<void>;
};

function HeaderAttribute({ attribute, handleDelete }: Props) {
  return (
    <div className="flex justify-between">
      <span className="text-xl text-foreground font-semibold">
        {attribute.name}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVerticalIcon className="text-sm" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              handleDelete(attribute.id);
            }}
          >
            <TrashIcon className="text-foreground w-5" strokeWidth="1.25" />
            <p>Hapus</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer  ">
            <EditIcon className="text-foreground w-5" strokeWidth="1.25" />
            <p>Edit</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderAttribute;
