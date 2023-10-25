import { Router } from 'express';
import thumbnailController from '../controller/thumbnail.controller';
import fileUpload from 'express-fileupload';
import fileExtLimiter from '../middleware/file-ext-limiter';
import fileSizeLimiter from '../middleware/file-size-limiter';

export const ThumbnailRouter: Router = Router();

ThumbnailRouter.post(
  '/',
  fileUpload({ createParentPath: true }),
  fileExtLimiter(['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG']),
  fileSizeLimiter,
  thumbnailController.create
);

ThumbnailRouter.delete('/:thumbnailId', thumbnailController.deleteThumbnail);

export default ThumbnailRouter;
