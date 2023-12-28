import { validationResult } from "express-validator";

export const checkSchemaValidityMiddleware = async (
  request,
  response,
  next
) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ message: errors.array() });
    }
    next();
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};
