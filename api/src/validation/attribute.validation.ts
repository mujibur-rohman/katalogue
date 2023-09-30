import Joi from "joi";

const addAttributeValidation = Joi.object({
  name: Joi.string().min(3).max(64).required(),
});

const addAttributeItemValidation = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  attributeId: Joi.number().required(),
});

const updateAttributeItemValidation = Joi.object({
  name: Joi.string().min(1).max(64).required(),
});

export {
  addAttributeValidation,
  addAttributeItemValidation,
  updateAttributeItemValidation,
};
