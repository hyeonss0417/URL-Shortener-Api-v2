import { celebrate, Joi } from "celebrate";

export default {
  shortenUrl: celebrate({
    body: Joi.object({
      url: Joi.string().required().uri(),
      access_key: Joi.string()
        .min(1)
        .max(100)
        .regex(/^[\w-]+$/),
    }),
  }),
};
