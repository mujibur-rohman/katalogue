import { NextFunction, Request, Response } from "express";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import fs from "fs";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files?.thumbnail) {
      throw new ResponseError(404, "thumbnail not found");
    }

    let fileName: string | null;
    let urlPicture: string | null = null;
    const dataThumbnail = req.files.thumbnail;

    // @ts-ignore
    fileName = `${Date.now()}-${dataThumbnail.name}`;
    // @ts-ignore
    dataThumbnail?.mv(`./public/images/${fileName}`, async (err) => {
      if (err) throw new ResponseError(400, "error to move file");
    });

    urlPicture = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const newThumbnail = await db.thumbnail.create({
      data: {
        // @ts-ignore
        fileName,
        url: urlPicture,
      },
      select: {
        id: true,
        fileName: true,
        url: true,
      },
    });
    res.status(200).json(newThumbnail);
  } catch (error) {
    next(error);
  }
};

const deleteThumbnail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { thumbnailId } = req.params;
    const availableThumbnail = await db.photo.findFirst({
      where: {
        id: parseInt(thumbnailId),
      },
    });

    if (!availableThumbnail) {
      throw new ResponseError(400, "thumbnail not found");
    }

    // delete file
    const filepath = `./public/images/${availableThumbnail.fileName}`;
    fs.unlinkSync(filepath);
    await db.thumbnail.delete({
      where: {
        id: availableThumbnail.id,
      },
    });

    res.json({
      message: "thumbnail deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default { create, deleteThumbnail };
