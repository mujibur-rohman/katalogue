import Joi from "joi";

const addProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  photos: Joi.array().items(
    Joi.object().keys({
      fileName: Joi.string().required(),
      url: Joi.string().required(),
    })
  ),
});

export { addProductValidation };
