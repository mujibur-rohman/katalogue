"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

function HeaderProduct({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mb-5 flex justify-between">
      <span className="text-2xl font-bold">Products</span>
      <Button
        onClick={() => {
          router.push(pathname + "/add");
        }}
        className="flex gap-2"
      >
        <PlusIcon className="text-background" />
        <span>Add Product</span>
      </Button>
    </div>
  );
}

export default HeaderProduct;
