import { NextFunction, Request, Response } from "express";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import fs from "fs";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files?.photo) {
      throw new ResponseError(404, "photo not found");
    }

    let fileName: string | null;
    let urlPicture: string | null = null;
    const dataPhoto = req.files.photo;

    // @ts-ignore
    fileName = `${Date.now()}-${dataPhoto.name}`;
    // @ts-ignore
    dataPhoto?.mv(`./public/images/${fileName}`, async (err) => {
      if (err) throw new ResponseError(400, "error to move file");
    });

    urlPicture = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const newPhoto = await db.photo.create({
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
    res.status(200).json(newPhoto);
  } catch (error) {
    next(error);
  }
};

const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { photoId } = req.params;
    const availablePhoto = await db.photo.findFirst({
      where: {
        id: parseInt(photoId),
      },
    });

    if (!availablePhoto) {
      throw new ResponseError(400, "photo not found");
    }

    // delete file
    const filepath = `./public/images/${availablePhoto.fileName}`;
    fs.unlinkSync(filepath);
    await db.photo.delete({
      where: {
        id: availablePhoto.id,
      },
    });

    res.json({
      message: "photo deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default { create, deletePhoto };
