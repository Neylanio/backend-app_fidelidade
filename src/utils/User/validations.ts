import Joi from 'joi';

const validationPassword = Joi.object({
  password: Joi.string().min(6),
});

const validationEmail = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

export { validationPassword, validationEmail };
