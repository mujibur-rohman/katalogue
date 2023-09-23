import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";

const filePayloadExist = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) throw new ResponseError(400, "missing file");
  next();
};

export default filePayloadExist;
