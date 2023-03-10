import UserModel from "../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/index"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // retornar todos los usuarios registrados
    const users = await UserModel.find({});
    return res.status(200).json({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }

};
export const Register = async(req:Request, res: Response)=>{
  //registro de usuario 
  try {
    // Validar existencia de la información del usuario
    const {email, password, username, password_confirmation} = req.body;
    if (!password_confirmation  || !email || !password|| !username) {
      return res.status(400).json({ mensaje: 'Por favor, proporcione todos los datos requeridos' });
    }
    // Verificar si ya existe un usuario con el correo electrónico proporcionado
    const usuarioExistente: IUser | null = await UserModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo electrónico' });
    }
    // Verificar si el correo es institucional
    if(!email.includes("@unal.edu.co")){
      return res.status(400).json({ mensaje: 'Debe registrarse con su correo institucional' });
    }
    // Verificar seguridadd e la contraseña
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexPass.test(password)) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número' });
    }
    //verificar que las contraseñas coincidan
    if(password != password_confirmation){
      return res.status(400).json({mensaje: "Las contraseñas no coinciden"})
    }
    //verificar si ya existe usuario con el mismo username
    const usernameExistente: IUser | null = await UserModel.findOne({ username });
    if (usernameExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese nombre de usuario' });
    }
    // Encriptar contraseña
    const salt: string = await bcrypt.genSalt(10);
    const passwordCrypt: string = await bcrypt.hash(password, salt);

    // Crear una nueva instancia del modelo de usuario y guardarla en la base de datos
    const nuevoUsuario = new UserModel({email, username,password: passwordCrypt});
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error en el servidor al registrar el usuario' });
  }
};






