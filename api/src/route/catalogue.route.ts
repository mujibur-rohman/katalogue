import { Router } from "express";
import catalogueController from "../controller/catalogue.controller";

export const CatalogueRouter: Router = Router();
CatalogueRouter.post("/", catalogueController.create);
CatalogueRouter.post("/slug", catalogueController.checkSlug);
CatalogueRouter.patch("/watch/:catalogueId", catalogueController.watch);
CatalogueRouter.put("/:catalogueId", catalogueController.update);
CatalogueRouter.get("/:catalogueId", catalogueController.getOne);
CatalogueRouter.delete("/:catalogueId", catalogueController.deleteCatalogue);
CatalogueRouter.get("/", catalogueController.getAll);

export default CatalogueRouter;
