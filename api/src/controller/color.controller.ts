import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { addColorValidation } from "../validation/color.validation";
import { db } from "../app/database";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const color = validate(addColorValidation, req.body);
    // await db
  } catch (error) {
    next(error);
  }
};

export default { create };
