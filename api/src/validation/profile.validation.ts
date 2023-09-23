import Joi from "joi";

const changeProfileValidation = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().max(255).required(),
});

export { changeProfileValidation };
