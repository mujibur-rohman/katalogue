import { Router } from "express";
import itemAttributeControler from "../controller/item-attribute.controler";

export const AttributeItemRouter: Router = Router();

AttributeItemRouter.get("/", itemAttributeControler.getAll);
AttributeItemRouter.get("/:id", itemAttributeControler.getOne);
AttributeItemRouter.post("/", itemAttributeControler.addAttributeItem);
AttributeItemRouter.put("/:id", itemAttributeControler.updateAttributeItem);
AttributeItemRouter.delete("/:id", itemAttributeControler.deleteAttributeItem);

export default AttributeItemRouter;
