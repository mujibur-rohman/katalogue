import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import {
  addProductValidation,
  updateProductValidation,
} from "../validation/product.validation";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import fs from "fs";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productBody = validate(addProductValidation, req.body);
    const product = await db.product.create({
      data: {
        catalogueId: productBody.catalogueId,
        name: productBody.name,
        description: productBody.description,
        price: productBody.price,
      },
    });

    // handle thumbnail
    const availableThumbnail = await db.thumbnail.findFirst({
      where: {
        id: productBody.thumbnailId,
      },
    });

    if (!availableThumbnail) {
      throw new ResponseError(404, "thumbnail not found");
    }
    await db.thumbnail.update({
      where: {
        id: availableThumbnail.id,
      },
      data: {
        productId: product.id,
      },
    });

    // handle photo
    productBody.photos.forEach(async (idPhoto: number) => {
      await db.photo.update({
        where: {
          id: idPhoto,
        },
        data: {
          productId: product.id,
        },
      });
    });

    // handle attribute
    productBody.attributes.forEach(
      async (attribute: { attributeId: number; itemId: number[] }) => {
        const attributeRel = await db.attributeRelation.create({
          data: {
            productId: product.id,
            attributeId: attribute.attributeId,
          },
        });

        attribute.itemId.forEach(async (item: number) => {
          await db.attributeItemRelation.create({
            data: {
              attributeRelationId: attributeRel.id,
              attributeItemId: item,
            },
          });
        });
      }
    );

    res.status(200).json({
      message: "product create successfully",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const productBody = validate(updateProductValidation, req.body);

    const availableProduct = await db.product.findFirst({
      where: {
        id: parseInt(productId),
      },
    });

    if (!availableProduct) {
      throw new ResponseError(404, "product not found");
    }

    // update thumbnail
    const availableThumbnail = await db.thumbnail.findFirst({
      where: {
        id: productBody.thumbnailId,
      },
    });

    if (!availableThumbnail) {
      throw new ResponseError(404, "thumbnail not found");
    }

    // jika thumbnail id nya tidak sama dengan sebelumnya
    if (availableThumbnail.productId !== availableProduct.id) {
      // hapus yang lama
      const oldImg = await db.thumbnail.findFirst({
        where: {
          productId: availableProduct.id,
        },
      });
      if (oldImg) {
        const filepath = `./public/images/${oldImg.fileName}`;
        fs.unlinkSync(filepath);

        await db.thumbnail.delete({
          where: {
            productId: availableProduct.id,
          },
        });
      }
      // update yang baru
      await db.thumbnail.update({
        where: {
          id: availableThumbnail.id,
        },
        data: {
          productId: availableProduct.id,
        },
      });
    }

    // handle photo
    // cari yang sebelumnya ada sekarang tidak ada
    const allPhotoProduct = await db.photo.findMany({
      where: {
        productId: availableProduct.id,
      },
    });
    allPhotoProduct.forEach(
      async (photo: {
        id: number;
        productId: number | null;
        fileName: string;
        url: string;
      }) => {
        if (!productBody.photos.includes(photo.id)) {
          const oldImg = await db.photo.findFirst({
            where: {
              id: photo.id,
            },
          });
          if (oldImg) {
            const filepath = `./public/images/${oldImg.fileName}`;
            fs.unlinkSync(filepath);
            await db.photo.delete({
              where: {
                id: oldImg.id,
              },
            });
          }
        }
      }
    );
    productBody.photos.forEach(async (idPhoto: number) => {
      const newPhoto = await db.photo.findFirst({
        where: {
          id: idPhoto,
          productId: null,
        },
      });
      if (newPhoto) {
        await db.photo.update({
          where: {
            id: newPhoto.id,
          },
          data: {
            productId: availableProduct.id,
          },
        });
      }
    });

    const updatedProduct = await db.product.update({
      where: {
        id: availableProduct.id,
      },
      data: {
        name: productBody.name,
        description: productBody.description,
        price: productBody.price,
      },
    });

    res.json("Success");
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const availableProduct = await db.product.findFirst({
      where: {
        id: parseInt(productId),
      },
      include: {
        attributes: {
          select: {
            attribute: {
              select: {
                id: true,
                name: true,
              },
            },
            item: {
              select: {
                attributeItem: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        catalogue: true,
        photos: true,
        thumbnail: true,
      },
    });
    if (!availableProduct) {
      throw new ResponseError(404, "product not found");
    }
    res.status(200).json(availableProduct);
  } catch (error) {
    next(error);
  }
};

export default { addProduct, getOne, update };
