import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import {
  addAttributeItemValidation,
  updateAttributeItemValidation,
} from "../validation/attribute.validation";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const query = req.query.q || "";
    const offset =
      parseInt(limit as string) * parseInt(page as string) -
      parseInt(limit as string);

    const totalRows = await db.attributeItem.count({
      where: {
        name: {
          contains: query as string,
        },
        attributeId: parseInt(req.query.attributeId as string),
      },
    });

    const attr = await db.attributeItem.findMany({
      skip: offset,
      take: parseInt(limit as string),
      where: {
        name: {
          contains: query as string,
        },
      },
      orderBy: {
        name: "asc",
      },
      include: {
        attribute: true,
      },
    });
    res.status(200).json({
      limit: parseInt(limit as string),
      page: parseInt(page as string),
      totalRows,
      data: attr,
    });
  } catch (error) {
    next(error);
  }
};

const addAttributeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attributeItem = validate(addAttributeItemValidation, req.body);

    const availableAttr = await db.attribute.count({
      where: {
        id: attributeItem.attributeId,
      },
    });

    if (!availableAttr) {
      throw new ResponseError(404, "attribute not found");
    }

    const newAttItem = await db.attributeItem.create({
      data: {
        name: attributeItem.name,
        attributeId: attributeItem.attributeId,
      },
    });

    res.status(200).json({
      message: newAttItem.name + " added",
    });
  } catch (error) {
    next(error);
  }
};

const updateAttributeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attributeItem = validate(updateAttributeItemValidation, req.body);
    const { id } = req.params;

    const availableAttrItem = await db.attributeItem.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!availableAttrItem) {
      throw new ResponseError(404, "attribute item not found");
    }

    await db.attributeItem.update({
      where: {
        id: availableAttrItem.id,
      },
      data: {
        name: attributeItem.name,
      },
    });

    res.status(200).json({
      message: "attribute item update successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const availableAttrItem = await db.attributeItem.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        attribute: true,
      },
    });

    if (!availableAttrItem) {
      throw new ResponseError(404, "attribute item not found");
    }
    res.status(200).json(availableAttrItem);
  } catch (error) {
    next(error);
  }
};

const deleteAttributeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableAttrItem = await db.attributeItem.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!availableAttrItem) {
      throw new ResponseError(404, "attribute item not found");
    }
    await db.attributeItem.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json({
      message: "attribute item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addAttributeItem,
  updateAttributeItem,
  getAll,
  deleteAttributeItem,
  getOne,
};
