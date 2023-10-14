import Joi from 'joi';

const addProductValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  thumbnailId: Joi.number().required(),
  photosId: Joi.array().items(Joi.number().required()),
  attributes: Joi.array().items(
    Joi.object().keys({
      attributeId: Joi.string().required(),
      items: Joi.array()
        .required()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
          })
        ),
    })
  ),
});

export { addProductValidation };
