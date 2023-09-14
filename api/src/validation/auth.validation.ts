import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().max(32).required(),
  password: Joi.string().max(16).required(),
  name: Joi.string().max(64).required(),
});

const loginValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const refreshValidation = Joi.object({
  token: Joi.string().required(),
});

export { loginValidation, registerValidation, refreshValidation };
