import React from "react";
import HeaderProduct from "../../components/header-product";
import { getAllProduct } from "@/actions/product";
import ListOfProducts from "../components/ListOfProducts";

type Props = {
  params: {
    catalogueId: string;
  };
};

async function Products({ params: { catalogueId } }: Props) {
  const products = await getAllProduct({ catalogueId });
  return (
    <div className="p-base pb-8">
      <HeaderProduct />
      <ListOfProducts products={products} />
    </div>
  );
}

export default Products;
