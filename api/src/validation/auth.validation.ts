import Joi from "joi";

const registerValidation = Joi.object({
  email: Joi.string().max(32).required().email(),
  password: Joi.string().max(16),
  name: Joi.string().max(64).required(),
  provider: Joi.string().valid("credential", "google").required(),
});

const loginValidation = Joi.object({
  email: Joi.string().max(100).required().email(),
  password: Joi.string().max(100).required(),
});

const refreshValidation = Joi.object({
  token: Joi.string().required(),
});

export { loginValidation, registerValidation, refreshValidation };
