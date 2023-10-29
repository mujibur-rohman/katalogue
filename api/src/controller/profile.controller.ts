import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { changeProfileValidation } from "../validation/profile.validation";
import { db } from "../app/database";
import fs from "fs";
import { ResponseError } from "../error/response-error";

const changeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = validate(changeProfileValidation, req.body);
    const userId = req.params.userId;
    const availableUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    const availableProfile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!availableProfile || !availableUser) {
      throw new ResponseError(400, "user not found");
    }

    let fileName: string | null;
    let urlPicture: string | null = null;

    const profilePicture = req.files?.profilePicture;

    // if user not upload new profile Picture
    if (!profilePicture) {
      fileName = availableProfile.photoFilename;
    } else {
      // @ts-ignore
      fileName = `${Date.now()}-${profilePicture.name}`;
      // @ts-ignore
      profilePicture?.mv(`./public/images/${fileName}`, async (err) => {
        if (err) throw new ResponseError(400, "error to move file");
      });

      // delete old file
      if (availableProfile.photoFilename) {
        const filepath = `./public/images/${availableProfile.photoFilename}`;
        fs.unlinkSync(filepath);
      }
    }

    if (fileName !== null) {
      urlPicture = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }

    await db.user.update({
      where: { id: userId },
      data: {
        name: profile.name,
      },
    });

    const data = await db.profile.update({
      where: { userId },
      data: {
        bio: profile.bio,
        photoFilename: fileName,
        profilePicture: urlPicture,
      },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const availableUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    const availableProfile = await db.profile.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        bio: true,
        photoFilename: true,
        profilePicture: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!availableProfile || !availableUser) {
      throw new ResponseError(400, "user not found");
    }

    res.status(200).json(availableProfile);
  } catch (error) {
    next(error);
  }
};

export default { changeProfile, getProfile };
