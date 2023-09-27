import Joi from "joi";

const addAttributeValidation = Joi.object({
  name: Joi.string().min(3).max(64).required(),
});

export { addAttributeValidation };
