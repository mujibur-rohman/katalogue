import { getAllAttributes } from "@/actions/attribute";
import React from "react";
import HeaderPage from "./components/header-page";
import AttributeLists from "./components/attribute-lists";

export default async function Attributes() {
  const attributes = await getAllAttributes();
  attributes.data;
  return (
    <React.Fragment>
      <div className="p-base">
        <HeaderPage />
        {!attributes.data.length ? (
          <div>Data Kosong</div>
        ) : (
          <AttributeLists attributes={attributes.data} />
        )}
      </div>
    </React.Fragment>
  );
}
