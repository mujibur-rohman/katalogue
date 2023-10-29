"use client";

import { TypeProduct } from "@/actions/product";
import React from "react";
import ItemProduct from "./item-product";

type Props = {
  products: TypeProduct[];
};

function ListOfProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-3">
      {products.map((product) => (
        <ItemProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ListOfProducts;
