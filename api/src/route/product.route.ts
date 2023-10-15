import { Router } from "express";
import fileUpload from "express-fileupload";
import fileExtLimiter from "../middleware/file-ext-limiter";
import fileSizeLimiter from "../middleware/file-size-limiter";
import productController from "../controller/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.post(
  "/",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  productController.addProduct
);
ProductRouter.get("/:productId", productController.getOne);

export default ProductRouter;
