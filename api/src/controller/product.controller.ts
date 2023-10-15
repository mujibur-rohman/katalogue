import { NextFunction, Request, Response } from "express";
import { validate } from "../validation";
import { addProductValidation } from "../validation/product.validation";
import { db } from "../app/database";
import { ResponseError } from "../error/response-error";

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

    // // handle thumbnail
    // const availableThumbnail = await db.thumbnail.findFirst({
    //   where: {
    //     id: productBody.thumbnailId,
    //   },
    // });

    // if (!availableThumbnail) {
    //   throw new ResponseError(404, "thumbnail not found");
    // }
    // await db.thumbnail.update({
    //   where: {
    //     id: availableThumbnail.id,
    //   },
    //   data: {
    //     productId: product.id,
    //   },
    // });

    // // handle photo
    // productBody.photos.forEach(async (idPhoto: number) => {
    //   await db.photo.update({
    //     where: {
    //       id: idPhoto,
    //     },
    //     data: {
    //       productId: product.id,
    //     },
    //   });
    // });

    // handle attribute
    productBody.attributes.forEach(
      async (attribute: { attributeId: number; itemId: number[] }) => {
        await db.attributeRelation.create({
          data: {
            productId: product.id,
            attributeId: attribute.attributeId,
          },
        });
      }
    );

    console.log(product.id);
    res.json("SUCCESS");
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
          },
          // include: {
          //   attributeItem: true,
          // },
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

export default { addProduct, getOne };
