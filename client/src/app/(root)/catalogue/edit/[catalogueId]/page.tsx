import React from "react";
import FormEdit from "../../components/form-edit";
import { getOneCatalogue } from "@/actions/catalogue";
import { notFound } from "next/navigation";

type Props = {
  params: {
    catalogueId: string;
  };
};

async function EditCatalogue({ params: { catalogueId } }: Props) {
  const catalogue = await getOneCatalogue(catalogueId);
  if (!catalogue) {
    notFound();
  }
  return (
    <div className="p-base">
      <h1 className="inline-block mb-3 font-semibold text-lg">
        Edit Catalogue
      </h1>
      <FormEdit catalogue={catalogue} />
    </div>
  );
}

export default EditCatalogue;
