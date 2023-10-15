import Joi from "joi";

const addProductValidation = Joi.object({
  catalogueId: Joi.string().required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  thumbnailId: Joi.number().required(),
  photosId: Joi.array().items(Joi.number().required()),
  attributes: Joi.array().items(
    Joi.object().keys({
      attributeId: Joi.number().required(),
      itemId: Joi.array().required().items(Joi.number().required()),
    })
  ),
});

const updateProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  thumbnailId: Joi.number().required(),
  photosId: Joi.array().items(Joi.number().required()),
  attributes: Joi.array().items(
    Joi.object().keys({
      attributeId: Joi.number().required(),
      itemId: Joi.array().required().items(Joi.number().required()),
    })
  ),
});

export { addProductValidation, updateProductValidation };
