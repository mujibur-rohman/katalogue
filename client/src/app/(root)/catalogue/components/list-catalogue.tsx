import { PaginationResponseCatalogue } from "@/actions/catalogue";
import React from "react";
import ItemCatalogue from "./item-catalogue";
import DataEmpty from "../../components/data-empty";

type Props = {
  catalogues: PaginationResponseCatalogue;
};

async function ListCatalogue({ catalogues }: Props) {
  return (
    <React.Fragment>
      <span className="mb-5 inline-block">
        Total : <span>{catalogues.totalRows}/6</span>
      </span>
      {catalogues.data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {catalogues.data.map((cat) => (
            <ItemCatalogue key={cat.id} catalogue={cat} />
          ))}
        </div>
      ) : (
        <DataEmpty />
      )}
    </React.Fragment>
  );
}

export default ListCatalogue;
