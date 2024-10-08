import * as joi from 'joi';

export const validationSchema = joi.object({
  PORT: joi.number().default(3000),
  DATABASE_URL: joi.string().required(),
  SWAGGER_USERNAME: joi.string().required(),
  SWAGGER_PASSWORD: joi.string().required(),
});
