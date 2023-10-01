import Joi from "joi";

const addAttributeValidation = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  userId: Joi.string().min(3).max(255).required(),
});

const updateAttributeValidation = Joi.object({
  name: Joi.string().min(3).max(16).required(),
});

const addAttributeItemValidation = Joi.object({
  name: Joi.string().min(1).max(15).required(),
  attributeId: Joi.number().required(),
});

const updateAttributeItemValidation = Joi.object({
  name: Joi.string().min(1).max(64).required(),
});

export {
  addAttributeValidation,
  addAttributeItemValidation,
  updateAttributeItemValidation,
  updateAttributeValidation,
};
