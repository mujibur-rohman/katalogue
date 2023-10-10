import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { addProductValidation } from "../validation/product.validation";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productBody = validate(addProductValidation, req.body);
    console.log(productBody);
    console.log(req.files);
    res.json("SUCCESS");
  } catch (error) {
    next(error);
  }
};

export default { addProduct };
