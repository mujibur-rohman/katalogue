import React from "react";
import FormAddProduct from "../../components/form-add-product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllAttributes } from "@/actions/attribute";

async function AddProduct() {
  const session = await getServerSession(authOptions);

  const attributes = await getAllAttributes({
    userId: session?.user.id as string,
    limit: -1,
  });

  attributes.data;

  return (
    <div className="p-base">
      <FormAddProduct attributes={attributes.data} />
    </div>
  );
}

export default AddProduct;
