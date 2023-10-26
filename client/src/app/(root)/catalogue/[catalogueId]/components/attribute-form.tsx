import { TypeAttribute } from "@/actions/attribute";
import { Checkbox } from "@/components/ui/checkbox";

function AttributeForm({ attributes }: { attributes: TypeAttribute[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {attributes.map((attr) => (
        <div key={attr.id} className="rounded-lg overflow-hidden border-[1px]">
          <label
            htmlFor={attr.id.toString()}
            className="border-b-[1px] items-center cursor-pointer py-2 px-5 flex justify-between"
          >
            <span className="font-medium grow">{attr.name}</span>
            <Checkbox id={attr.id.toString()} />
          </label>
          <div className="py-2 px-4 flex flex-col gap-2">
            {attr.item.map((item) => (
              <label
                htmlFor={item.id.toString() + "-item"}
                key={item.id}
                className="flex justify-between px-2 bg-secondary/40 hover:bg-secondary/80 transition-colors cursor-pointer border-[1px] items-center"
              >
                <span className="block py-2 grow">{item.name}</span>
                <Checkbox id={item.id.toString() + "-item"} />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttributeForm;
