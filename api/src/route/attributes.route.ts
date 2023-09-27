import { Router } from "express";
import attributeController from "../controller/attribute.controller";

export const AttributeRouter: Router = Router();

AttributeRouter.get("/", attributeController.getAll);
AttributeRouter.post("/", attributeController.addAttribute);
AttributeRouter.put("/:id", attributeController.updateAttribute);
AttributeRouter.delete("/:id", attributeController.deleteAttribute);

export default AttributeRouter;
