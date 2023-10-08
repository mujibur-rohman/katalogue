import Joi from "joi";

const addCatalogueValidation = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().optional(),
  url: Joi.string().required(),
  visitCount: Joi.number().optional(),
});

export { addCatalogueValidation };
