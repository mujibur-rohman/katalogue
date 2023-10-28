import { TypeAttribute } from "@/actions/attribute";
import { TypePayloadProduct } from "@/actions/product";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFormikContext } from "formik";

function AttributeForm({ attributes }: { attributes: TypeAttribute[] }) {
  const formik = useFormikContext<TypePayloadProduct>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {attributes.map((attr) => {
        const attrIdSelected = formik.values.attributes?.map(
          (att) => att.attributeId
        );
        return (
          <div
            key={attr.id}
            className="rounded-lg overflow-hidden border-[1px]"
          >
            <label
              htmlFor={attr.id.toString()}
              className="border-b-[1px] items-center cursor-pointer py-2 px-5 flex justify-between"
            >
              <span className="font-medium grow">{attr.name}</span>
              <Checkbox
                id={attr.id.toString()}
                checked={attrIdSelected?.includes(attr.id)}
                onCheckedChange={(val) => {
                  if (formik.values.attributes) {
                    // * if unchecked
                    if (!val) {
                      const filterAttr = formik.values.attributes.filter(
                        (atId) => atId.attributeId !== attr.id
                      );
                      formik.setFieldValue(`attributes`, filterAttr);
                      return;
                    }
                    // * if checked
                    formik.setFieldValue(`attributes`, [
                      ...formik.values.attributes,
                      { attributeId: attr.id, itemId: [] },
                    ]);
                    return;
                  }
                  formik.setFieldValue(`attributes`, [
                    { attributeId: attr.id, itemId: [] },
                  ]);
                }}
              />
            </label>
            <div className="py-2 px-4 flex flex-col gap-2">
              {attr.item.map((item) => {
                const availableChecked = formik.values.attributes?.filter(
                  (atId) => atId.attributeId === attr.id
                );
                let selectedItem: number[] = [];
                if (availableChecked?.length) {
                  selectedItem = availableChecked[0].itemId;
                }

                return (
                  <label
                    htmlFor={item.id.toString() + "-item"}
                    key={item.id}
                    className={cn(
                      "flex justify-between px-2 bg-secondary/40 hover:bg-secondary/80 transition-colors cursor-pointer border-[1px] items-center",
                      {
                        "cursor-not-allowed text-gray-400 hover:bg-secondary/40":
                          !availableChecked?.length,
                      }
                    )}
                  >
                    <span className="block py-2 grow">{item.name}</span>
                    <Checkbox
                      disabled={!availableChecked?.length}
                      checked={selectedItem.includes(item.id)}
                      id={item.id.toString() + "-item"}
                      onCheckedChange={(val) => {
                        if (formik.values.attributes) {
                          const idxAttr = formik.values.attributes.findIndex(
                            (attr) => attr.attributeId === item.attributeId
                          );
                          const currentData = formik.values.attributes[idxAttr];

                          if (!val) {
                            const newItemData = currentData.itemId.filter(
                              (i) => i !== item.id
                            );
                            formik.setFieldValue(`attributes[${idxAttr}]`, {
                              attributeId: currentData.attributeId,
                              itemId: newItemData,
                            });
                            return;
                          }

                          // * if checked
                          formik.setFieldValue(`attributes[${idxAttr}]`, {
                            attributeId: currentData.attributeId,
                            itemId: [...currentData.itemId, item.id],
                          });
                        }
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AttributeForm;
