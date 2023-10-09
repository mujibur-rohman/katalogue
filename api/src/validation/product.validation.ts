import Joi from "joi";

const addProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  mainPhoto: Joi.string().required(),
});

export { addProductValidation };
