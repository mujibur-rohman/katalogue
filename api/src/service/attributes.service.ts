import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation";
import {
  addAttributeValidation,
  updateAttributeValidation,
} from "../validation/attribute.validation";

const add = async (request: any) => {
  const attribute = validate(addAttributeValidation, request);
  const totalAttrUser = await db.attribute.count({
    where: {
      userId: attribute.userId,
    },
  });

  if (totalAttrUser >= 10) {
    throw new ResponseError(403, "attribute has reached the maximum");
  }

  return db.attribute.create({
    data: {
      name: attribute.name,
      userId: attribute.userId,
    },
  });
};

const update = async (request: any, id: number) => {
  const attribute = validate(updateAttributeValidation, request);

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
