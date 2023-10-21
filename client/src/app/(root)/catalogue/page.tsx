import { getAllCatalogues } from "@/actions/catalogue";
import HeaderCatalogue from "./components/header-catalogue";
import ListCatalogue from "./components/list-catalogue";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Catalogue() {
  const session = await getServerSession(authOptions);
  const catalogues = await getAllCatalogues({
    userId: session?.user.id as string,
  });
  return (
    <div className="p-base pb-8">
      <HeaderCatalogue countCatalogue={catalogues.totalRows} />
      <ListCatalogue catalogues={catalogues} />
    </div>
  );
}
