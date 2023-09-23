import { Router } from "express";
import profileController from "../controller/profile.controller";
import fileUpload from "express-fileupload";
import filePayloadExist from "../middleware/file-payload-exist";
import fileExtLimiter from "../middleware/file-ext-limiter";
import fileSizeLimiter from "../middleware/file-size-limiter";

export const ProfileRouter: Router = Router();

ProfileRouter.put(
  "/:userId",
  fileUpload({ createParentPath: true }),
  //   filePayloadExist,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  profileController.changeProfile
);

export default ProfileRouter;
