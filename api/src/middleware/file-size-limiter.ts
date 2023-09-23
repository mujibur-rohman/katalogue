import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files;

  if (files) {
    const filesOverLimit = [];

    Object.keys(files as object).forEach((key) => {
      // @ts-ignore
      if (files[key].size > FILE_SIZE_LIMIT) {
        // @ts-ignore
        filesOverLimit.push(files[key].name);
      }
    });

    if (filesOverLimit.length) {
      throw new ResponseError(400, "max size file " + MB + " MB");
    }
  }
  next();
};

export default fileSizeLimiter;
