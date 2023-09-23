import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import path from "path";

const fileExtLimiter = (allowedExt: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files = req.files;
    const fileExt: string[] = [];

    if (files) {
      Object.keys(files as object).forEach((key) => {
        // @ts-ignore
        fileExt.push(path.extname(files[key].name));
      });

      const allowed = fileExt.every((ext) => allowedExt.includes(ext));

      if (!allowed) {
        throw new ResponseError(400, "format file invalid");
      }
    }
    next();
  };
};

export default fileExtLimiter;
