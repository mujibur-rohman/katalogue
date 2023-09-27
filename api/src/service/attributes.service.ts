import { db } from "../app/database";
import { validate } from "../validation";
import { addAttributeValidation } from "../validation/attribute.validation";

const add = async (request: any) => {
  const attribute = validate(addAttributeValidation, request);
  return db.attribute.create({
    data: {
      name: attribute.name,
    },
  });
};

const update = async (request: any, id: number) => {
  const attribute = validate(addAttributeValidation, request);

  return db.attribute.update({
    where: {
      id,
    },
    data: {
      name: attribute.name,
    },
  });
};

export default { add, update };
