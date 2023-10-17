import HeaderCatalogue from "./components/header-catalogue";
import ListCatalogue from "./components/list-catalogue";

export default function Catalogue() {
  return (
    <div className="p-base pb-8">
      <HeaderCatalogue />

      <ListCatalogue />
    </div>
  );
}
