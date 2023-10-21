import { PaginationResponseCatalogue } from "@/actions/catalogue";
import React from "react";
import ItemCatalogue from "./item-catalogue";

type Props = {
  catalogues: PaginationResponseCatalogue;
};

async function ListCatalogue({ catalogues }: Props) {
  return (
    <React.Fragment>
      <span className="mb-5 inline-block">
        Total : <span>{catalogues.totalRows}/6</span>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {catalogues.data.map((cat) => (
          <ItemCatalogue key={cat.id} catalogue={cat} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default ListCatalogue;
