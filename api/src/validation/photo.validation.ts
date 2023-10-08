import Joi from "joi";

const addPhotoValidation = Joi.object({
  filename: Joi.string().max(255).required(),
  url: Joi.string().required(),
  productId: Joi.number().optional(),
});

export { addPhotoValidation };
