import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

function HeaderCatalogue({}: Props) {
  return (
    <div className="mb-5 flex justify-between">
      <span className="text-2xl font-bold">Catalogue</span>
      <Button className="flex gap-2">
        <PlusIcon className="text-background" />
        <span>Add Catalogue</span>
      </Button>
    </div>
  );
}

export default HeaderCatalogue;
