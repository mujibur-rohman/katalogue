import { getAllAttributes } from "@/actions/attribute";
import React from "react";
import HeaderPage from "./components/header-page";
import AttributeLists from "./components/attribute-lists";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Attributes() {
  const session = await getServerSession(authOptions);

  const attributes = await getAllAttributes({
    userId: session?.user.id as string,
  });
  return (
    <React.Fragment>
      <div className="p-base pb-8">
        <HeaderPage />
        <span className="mb-5 inline-block">
          Total : <span>{attributes.totalRows}/10</span>
        </span>
        {!attributes.data.length ? (
          <div>Data Kosong</div>
        ) : (
          <AttributeLists attributes={attributes.data} />
        )}
      </div>
    </React.Fragment>
  );
}
