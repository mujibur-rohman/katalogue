import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllAttributes } from "@/actions/attribute";
import FormEditProduct from "../../../components/form-edit-product";
import { getOneProduct } from "@/actions/product";

type Props = {
  params: {
    productId: string;
  };
};

async function EditProduct({ params: { productId } }: Props) {
  const session = await getServerSession(authOptions);

  const attributes = await getAllAttributes({
    userId: session?.user.id as string,
    limit: -1,
  });

  const product = await getOneProduct(productId);

  return (
    <div className="p-base">
      <FormEditProduct attributes={attributes.data} product={product} />
    </div>
  );
}

export default EditProduct;
