/* eslint-disable @next/next/no-img-element */
import { TypeProduct, deleteProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { nFormatter } from "@/lib/helper/n-formatter";
import { useToast } from "@/lib/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  product: TypeProduct;
};

function ItemProduct({ product }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [modalDelete, setModalDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
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
    <React.Fragment>
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
      <div
        key={product.id}
        onClick={() => {
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ItemProduct;
