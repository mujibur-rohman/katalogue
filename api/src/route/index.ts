import { Application, Router } from "express";
import AuthRouter from "./auth.route";
import ProfileRouter from "./profile.route";
import AttributeRouter from "./attributes.route";
import AttributeItemRouter from "./attribute-item.route";
import CatalogueRouter from "./catalogue.route";

const _routes: Array<[string, Router]> = [
  ["/auth", AuthRouter],
  ["/profile", ProfileRouter],
  ["/attributes", AttributeRouter],
  ["/attributes-item", AttributeItemRouter],
  ["/catalogues", CatalogueRouter],
];

const router: (app: Application) => void = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};

export default router;
