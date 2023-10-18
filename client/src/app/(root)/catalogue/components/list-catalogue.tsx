import { getAllCatalogues } from "@/actions/catalogue";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import ItemCatalogue from "./item-catalogue";

type Props = {};

async function ListCatalogue({}: Props) {
  const session = await getServerSession(authOptions);
  const catalogues = await getAllCatalogues({
    userId: session?.user.id as string,
  });
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
