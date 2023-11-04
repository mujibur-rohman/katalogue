import { getOneCatalogueBySlug, watchCatalogue } from "@/actions/catalogue";
import React from "react";
import ListOfProducts from "../components/ListOfProduct";

type Props = {
  params: {
    slug: string;
  };
};

async function ListCatalogue({ params: { slug } }: Props) {
  const catalogue = await getOneCatalogueBySlug(slug);
  const wathced = await watchCatalogue(catalogue.id);
  console.log(wathced);
  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold">{catalogue.name}</h1>
      <p className="mb-5">{catalogue.description}</p>
      <ListOfProducts products={catalogue.products} />
    </div>
  );
}

export default ListCatalogue;
