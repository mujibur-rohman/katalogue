/* eslint-disable @next/next/no-img-element */
"use client";
import { PaginationResponseProduct } from "@/actions/product";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { nFormatter } from "@/lib/helper/n-formatter";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  products: PaginationResponseProduct;
};

function ListOfProducts({ products }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (!products.totalRows) {
    return <h1>Data Empty</h1>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-3">
      {products.data.map((product) => (
        <div
          key={product.id}
          onClick={(e) => {
            console.log(e.currentTarget);
            router.push(pathname + "/" + product.id);
          }}
          className="border-[1px] rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="overflow-hidden">
            <img
              src={product.thumbnail.url}
              className="w-full h-[15rem] object-cover object-center hover:scale-110 transition-transform duration-500"
              alt="product"
            />
          </div>
          <div className="p-3">
            <p className="font-semibold text-lg">{product.name}</p>
            <div className="flex justify-between">
              <p className="font-semibold text-2xl text-blue-500">
                Rp. {nFormatter(parseInt(product.price), 2)}
              </p>
              <TooltipProvider>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        onClick={(e) => {
                          // setModalDelete(true);
                          e.stopPropagation();
                        }}
                        className="flex gap-2 rounded p-1 cursor-pointer"
                      >
                        <TrashIcon className="w-4" strokeWidth="1.25" />
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
                          // router.push(pathname + "/edit/" + catalogue.id);
                        }}
                        className="flex gap-2 rounded p-1 cursor-pointer"
                      >
                        <EditIcon className="w-4" strokeWidth="1.25" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListOfProducts;
