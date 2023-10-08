import { Router } from "express";
import catalogueController from "../controller/catalogue.controller";

export const CatalogueRouter: Router = Router();
CatalogueRouter.post("/", catalogueController.create);

export default CatalogueRouter;
