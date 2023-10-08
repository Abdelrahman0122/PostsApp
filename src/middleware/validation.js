import { AppError } from "../utils/AppError.js";

 

export const validation = (schema) => {
  return (req, res, next) => {

    let inputs = { ...req.body , ...req.params , ...req.query };
    let { error } = schema.validate(inputs, { abortEarly: false });
    if (error) {
      let errors = error.details.map((err) => err.message);
      return next(new AppError(errors, 400));
    } else {
      next();
    }
  };
};
