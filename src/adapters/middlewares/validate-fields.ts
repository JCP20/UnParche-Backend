import { request, response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (
  req = request,
  res = response,
  next: () => void
) => {
  // TODO manejo de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};
