/* eslint-disable @next/next/no-img-element */
"use client";
import { PaginationResponseProduct } from "@/actions/product";
import ItemProduct from "./item-product";

type Props = {
  products: PaginationResponseProduct;
};

function ListOfProducts({ products }: Props) {
  if (!products.totalRows) {
    return <h1>Data Empty</h1>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-3">
      {products.data.map((product) => (
        <ItemProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ListOfProducts;
