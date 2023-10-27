import { getOneCatalogue } from "@/actions/catalogue";
import { BoxesIcon, EyeIcon } from "lucide-react";
import CopyUrl from "../../components/copy-url";

type Props = {
  params: {
    catalogueId: string;
  };
};

async function DetailCatalogue({ params: { catalogueId } }: Props) {
  const catalogue = await getOneCatalogue(catalogueId);
  return (
    <div className="p-base">
      <h1 className="text-2xl font-semibold pb-3 border-b-[1px]">
        {catalogue.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-3">
        <div className="flex justify-between items-center bg-gradient-to-l px-4 py-5 from-indigo-500 to-indigo-600 w-full mt-3 rounded-lg text-white">
          <div>
            <p className="text-3xl font-medium">{catalogue.visitCount}</p>
            <p>Viewed</p>
          </div>
          <EyeIcon className="text-xl w-12 h-12 text-white" />
        </div>
        <div className="flex justify-between items-center bg-gradient-to-l px-4 py-5 from-indigo-500 to-indigo-600 w-full mt-3 rounded-lg text-white">
          <div>
            <p className="text-3xl font-medium">{catalogue.products.length}</p>
            <p>Products</p>
          </div>
          <BoxesIcon className="text-xl w-12 h-12 text-white" />
        </div>
      </div>
      <CopyUrl url={catalogue.url} />
      <div className="mt-5">
        <h2 className="font-semibold text-xl">{catalogue.description}</h2>
        <p className="">{catalogue.description}</p>
      </div>
    </div>
  );
}

export default DetailCatalogue;
