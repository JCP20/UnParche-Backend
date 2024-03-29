import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../../../domain/entities/users";
import { sendEmail } from "../../../helpers/email";
import { verificarUsuario } from "../../../helpers/emailTemplates/verifyUser";
import { startSession } from "mongoose";

//registro de usuario
export const register = async (req: Request, res: Response) => {
  const session = await startSession();
  session.startTransaction();
  try {
    // Validar existencia de la información del usuario
    const { email, password, username, categories } = req.body;
    // Verificar si ya existe un usuario con el correo electrónico proporcionado
    const usuarioExistente: IUser | null = await UserModel.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo electrónico",
      });
    }
    // const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     ok: false,
    //     msg: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número",
    //   });
    // }

    //verificar si ya existe usuario con el mismo username
    const usernameExistente: IUser | null = await UserModel.findOne({
      username,
    });

    if (usernameExistente) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese nombre de usuario",
      });
    }
    const possibleCategories = [
      "Arte",
      "Deporte",
      "Religión",
      "Investigación",
      "Semillero",
      "Videojuegos",
      "Otro",
    ];

    const todasCategoriasValidas = categories.every((categories: string) =>
      possibleCategories.includes(categories)
    );

    if (!todasCategoriasValidas) {
      return res.status(400).json({
        ok: false,
        msg: "Una o más categorías proporcionadas no son válidas",
      });
    }
    // Encriptar contraseña
    const salt: string = await bcrypt.genSalt(10);
    const passwordCrypt: string = await bcrypt.hash(password, salt);

    // Crear una nueva instancia del modelo de usuario y guardarla en la base de datos
    const nuevoUsuario = new UserModel({
      email,
      username,
      password: passwordCrypt,
      verified: false,
      // preferredCategories: categories,
    });

    await nuevoUsuario.save({ session });

    await sendEmail(
      nuevoUsuario.email,
      "[UNParche] Verifica tu correo electrónico",
      verificarUsuario(
        nuevoUsuario.username,
        `${process.env.APP_URL}/verification/${nuevoUsuario.id}`
      )
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      ok: true,
      mensaje: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al registrar el usuario",
    });
  }
};
