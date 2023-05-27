import { Request, Response, NextFunction } from "express";
import { /* body,  */ validationResult } from "express-validator";
// import UserModel from "../models/User.model";

export default function registerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const registerValidator = [
  //   body('email')
  //     .isEmail()
  //     .withMessage('Por favor, proporcione un correo electrónico válido')
  //     .custom((value) => {
  //       if (!value.includes('@unal.edu.co')) {
  //         throw new Error('Debe registrarse con su correo institucional');
  //       }
  //       return true;
  //     }),
  //   body('password')
  //     .isLength({ min: 8 })
  //     .withMessage('La contraseña debe tener al menos 8 caracteres')
  //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  //     .withMessage(
  //       'La contraseña debe tener al menos una mayúscula y un número'
  //     ),
  //   body('password_confirmation')
  //     .exists()
  //     .withMessage('Por favor, proporcione una confirmación de contraseña')
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error('Las contraseñas no coinciden');
  //       }
  //       return true;
  //     }),
  //   body('username')
  //     .exists()
  //     .withMessage('Por favor, proporcione un nombre de usuario')
  //     .custom(async (value) => {
  //       const usuarioExistente = await UserModel.findOne({ username: value });
  //       if (usuarioExistente) {
  //         throw new Error('Ya existe un usuario con ese nombre de usuario');
  //       }
  //       return true;
  //     }),
  // ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
