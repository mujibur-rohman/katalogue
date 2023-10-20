import React from "react";
import FormAdd from "../components/form-add";

type Props = {};

function AddCatalogue({}: Props) {
    
  return (
    <div className="p-base">
      <h1 className="inline-block mb-3 font-semibold text-lg">New Catalogue</h1>
      <FormAdd />
    </div>
  );
}

export default AddCatalogue;
