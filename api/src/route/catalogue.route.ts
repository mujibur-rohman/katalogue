import { Router } from "express";
import catalogueController from "../controller/catalogue.controller";

export const CatalogueRouter: Router = Router();
CatalogueRouter.post("/", catalogueController.create);
CatalogueRouter.patch("/watch/:catalogueId", catalogueController.watch);
CatalogueRouter.put("/:catalogueId", catalogueController.update);
CatalogueRouter.get("/:catalogueId", catalogueController.getOne);
CatalogueRouter.get("/", catalogueController.getAll);
CatalogueRouter.post("/slug", catalogueController.checkSlug);

export default CatalogueRouter;
