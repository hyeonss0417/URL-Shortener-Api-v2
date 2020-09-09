import { celebrate, Joi } from "celebrate";
import { urlRegex } from "../../utils/utils";
import { CustomError } from "../../utils/CustomError";

export default {
  shortenUrl(req, res, next) {
    try {
      celebrate({
        body: Joi.object({
          url: Joi.string().required().regex(urlRegex),
          access_key: Joi.string().regex(/^[\w-]{1,100}$/),
        }),
      })(req, res, next);
    } catch (err) {
      console.log("###");
      next(new CustomError("WRONG_INPUT", 400, err.message));
    }
  },
};
