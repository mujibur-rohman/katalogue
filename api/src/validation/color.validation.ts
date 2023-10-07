import Joi from "joi";

const addColorValidation = Joi.object({
  name: Joi.string().max(64).required(),
  hex: Joi.string().required(),
});

export { addColorValidation };
