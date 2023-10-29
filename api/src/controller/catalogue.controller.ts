import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { db } from "../app/database";
import {
  addCatalogueValidation,
  updateCatalogueValidation,
} from "../validation/catalogue.validation";
import { v4 as uuid } from "uuid";
import { ResponseError } from "../error/response-error";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: req.query.userId?.toString(),
      },
    });

    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.q || "";
    const offset =
      parseInt(limit as string) * parseInt(page as string) -
      parseInt(limit as string);

    if (!user || !req.query.userId) {
      throw new ResponseError(404, "user not found");
    }
    const totalRows = await db.catalogue.count({
      where: {
        name: {
          contains: query as string,
        },
        userId: user.id,
      },
    });

    const cats = await db.catalogue.findMany({
      skip: offset,
      take: parseInt(limit as string),
      where: {
        name: {
          contains: query as string,
        },
        userId: user.id,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        products: {
          select: {
            _count: true,
          },
        },
      },
    });

    res.status(200).json({
      limit: parseInt(limit as string),
      page: parseInt(page as string),
      totalRows,
      data: cats,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { catalogueId } = req.params;

    const availableCatalogue = await db.catalogue.findFirst({
      where: {
        id: catalogueId,
      },
      include: {
        products: true,
      },
    });

    if (!availableCatalogue) {
      throw new ResponseError(404, "catalogue not found");
    }

    res.status(200).json(availableCatalogue);
  } catch (error) {
    next(error);
  }
};

const deleteCatalogue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { catalogueId } = req.params;

    const availableCatalogue = await db.catalogue.findFirst({
      where: {
        id: catalogueId,
      },
      include: {
        products: true,
      },
    });

    if (!availableCatalogue) {
      throw new ResponseError(404, "catalogue not found");
    }

    await db.catalogue.delete({
      where: {
        id: availableCatalogue.id,
      },
    });

    res.status(200).json(availableCatalogue);
  } catch (error) {
    next(error);
  }
};

const checkSlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      throw new ResponseError(403, "slug required");
    }

    const availableSlug = await db.catalogue.count({
      where: {
        slug: {
          equals: slug as string,
        },
      },
    });

    if (availableSlug) {
      throw new ResponseError(405, "slug not available");
    }

    res.status(200).json({ message: "slug available" });
  } catch (error) {
    next(error);
  }
};

const watch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { catalogueId } = req.params;

    const availableCatalogue = await db.catalogue.findFirst({
      where: {
        id: catalogueId,
      },
      include: {
        products: true,
      },
    });
    if (!availableCatalogue) {
      throw new ResponseError(404, "catalogue not found");
    }

    await db.catalogue.update({
      where: {
        id: availableCatalogue.id,
      },
      data: {
        visitCount: availableCatalogue.visitCount
          ? availableCatalogue.visitCount + 1
          : 1,
      },
    });

    res.status(200).json({
      message: "catalogue is watch",
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const catalogue = validate(addCatalogueValidation, req.body);

    const totalCatUser = await db.catalogue.count({
      where: {
        userId: catalogue.userId,
      },
    });

    if (totalCatUser >= 6) {
      throw new ResponseError(403, "catalogue has reached the maximum");
    }

    const availableSlug = await db.catalogue.count({
      where: {
        slug: catalogue.slug,
      },
    });

    if (availableSlug) {
      throw new ResponseError(401, "slug already exist");
    }

    const userAvailable = await db.user.findFirst({
      where: {
        id: catalogue.userId,
      },
    });

    if (!userAvailable) {
      throw new ResponseError(404, "user not found");
    }

    await db.catalogue.create({
      data: {
        id: uuid(),
        name: catalogue.name,
        url: catalogue.url,
        description: catalogue.description,
        visitCount: catalogue.visitCount,
        slug: catalogue.slug,
        userId: userAvailable.id,
      },
    });
    res.status(200).json({
      message: "catalogue created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { catalogueId } = req.params;
    const catalogue = validate(updateCatalogueValidation, req.body);

    const availableSlug = await db.catalogue.findFirst({
      where: {
        slug: catalogue.slug,
      },
    });

    if (availableSlug && availableSlug.id !== catalogueId) {
      throw new ResponseError(401, "slug already exist");
    }

    const availableCatalogue = await db.catalogue.findFirst({
      where: {
        id: catalogueId,
      },
    });

    if (!availableCatalogue) {
      throw new ResponseError(404, "catalogue not found");
    }

    await db.catalogue.update({
      where: {
        id: availableCatalogue.id,
      },
      data: {
        ...availableCatalogue,
        name: catalogue.name,
        description: catalogue.description,
        slug: catalogue.slug,
      },
    });
    res.status(200).json({
      message: "catalogue updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  update,
  getAll,
  getOne,
  watch,
  checkSlug,
  deleteCatalogue,
};
