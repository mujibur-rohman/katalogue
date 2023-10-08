import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { db } from "../app/database";
import { addCatalogueValidation } from "../validation/catalogue.validation";
import { v4 as uuid } from "uuid";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const catalogue = validate(addCatalogueValidation, req.body);
    
    await db.catalogue.create({
      data: {
        id: uuid(),
        name: catalogue.name,
        url: catalogue.url,
        description: catalogue.description,
        visitCount: catalogue.visitCount,
        userId: "a",
      },
    });
    res.status(200).json({
      message: "catalogue created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { create };
