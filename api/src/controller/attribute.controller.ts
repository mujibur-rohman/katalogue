import { NextFunction, Request, Response } from "express";
import attributesService from "../service/attributes.service";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";

const addAttribute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await attributesService.add(req.body);
    res.status(200).json({
      message: "attribute added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateAttribute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;

    const availableAttr = await db.attribute.count({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!availableAttr) {
      throw new ResponseError(404, "attribute not found");
    }

    await attributesService.update(req.body, parseInt(params.id));
    res.status(200).json({
      message: "attribute updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.q || "";
    const offset =
      parseInt(limit as string) * parseInt(page as string) -
      parseInt(limit as string);

    const totalRows = await db.attribute.count({
      where: {
        name: {
          contains: query as string,
        },
      },
    });

    const attr = await db.attribute.findMany({
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
        item: true,
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

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const availableAttr = await db.attribute.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        item: true,
      },
    });

    if (!availableAttr) {
      throw new ResponseError(404, "attribute not found");
    }

    res.status(200).json(availableAttr);
  } catch (error) {
    next(error);
  }
};

const deleteAttribute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableAttr = await db.attribute.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!availableAttr) {
      throw new ResponseError(404, "attribute not found");
    }
    await db.attribute.delete({
      where: {
        id: availableAttr.id,
      },
    });

    res.status(200).json({
      message: "attribute deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addAttribute,
  updateAttribute,
  getAll,
  deleteAttribute,
  getOne,
};
