import { Router } from "express";
import photoController from "../controller/photo.controller";
import fileUpload from "express-fileupload";
import fileExtLimiter from "../middleware/file-ext-limiter";
import fileSizeLimiter from "../middleware/file-size-limiter";

export const PhotoRouter: Router = Router();

PhotoRouter.post(
  "/",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  photoController.create
);

export default PhotoRouter;
