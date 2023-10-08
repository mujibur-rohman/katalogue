import Joi from "joi";

const addCatalogueValidation = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().optional(),
  url: Joi.string().required(),
  slug: Joi.string().max(64).required(),
  visitCount: Joi.number().optional(),
  userId: Joi.string().required(),
});

const updateCatalogueValidation = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().optional(),
  slug: Joi.string().required(),
});

export { addCatalogueValidation, updateCatalogueValidation };
