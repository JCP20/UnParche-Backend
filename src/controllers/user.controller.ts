import UserModel from "../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/index"

export const TimeoutPromise = (pr: Promise<any>, timeout: number) =>
  Promise.race([pr, new Promise((_, rej) =>
    setTimeout(rej, timeout)
  )]);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // retornar todos los usuarios registrados
    console.log("hola mundo");
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
    const { name, email, password, username,} = req.body;
    if (!name || !email || !password|| !username) {
      return res.status(400).json({ msg: 'Por favor, proporcione todos los datos requeridos' });
    }
    // Verificar si ya existe un usuario con el correo electrónico proporcionado
    const usuarioExistente: IUser | null = await UserModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Ya existe un usuario con ese correo electrónico' });
    }
    // Verificar si el correo es institucional
    if(!email.includes("@unal.edu.co")){
      return res.status(400).json({ msg: 'Debe registrarse con su correo institucional' });
    }
    // Verificar seguridadd e la contraseña
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexPass.test(password)) {
      return res.status(400).json({ msg: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número' });
    }
    //verificar si ya existe usuario con el mismo username
    const usernameExistente: IUser | null = await UserModel.findOne({ username });
    if (usernameExistente) {
      return res.status(400).json({ msg: 'Ya existe un usuario con ese nombre de usuario' });
    }
    // Encriptar contraseña
    const salt: string = await bcrypt.genSalt(10);
    const passwordCrypt: string = await bcrypt.hash(password, salt);

    // Crear una nueva instancia del modelo de usuario y guardarla en la base de datos
    const nuevoUsuario = new UserModel({ name, email, username, password: passwordCrypt, verified: false});
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Ocurrió un error en el servidor al registrar el usuario' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // El usuario ingrese a la cuenta
    console.log("hola login");
    const { email, password} = req.body;
    //key puede referirse al username o al email 
    const currentUserk: IUser | null = await UserModel.findOne({email});

    /** Se debe especificar si de ha dado el correo o el nombre de usuario,
     * por ahora se implementa sólo con email,
     * luego miramos cómo hacerlo para usuario
     */

    if (!email || !password) {
      //Se verifica que estén los datos pedidos
      return res.status(400).json({ msg: 'Por favor, proporcione todos los datos requeridos' });
    }

    if(!currentUserk){
      //Se verifica que el nombre de usuario o correo correspondan a algun usuario registrado
      return res.status(404).json({ msg: "El correo dado no se encuentra registrado" });
    }

    if(!currentUserk.verified){
      //Se verifica que el usuario haya verificado su cuenta al momento de registrarse
      return res.status(401).json({ msg: "Debes verificar tu cuenta para poder ingresar" });
    }


    //No devuelve nada si la contraseña no coincide, se demora mucho y por el mismo await no sigue hasta que encuentre una respuesta
    let equalPass = TimeoutPromise(bcrypt.compare(password, currentUserk.password), 500);
 
    if(await equalPass){
      //Verifica que la contraseña ingresada sea la misma registrada
      return res.status(200).json({ ok: true, msg: "El usuario ha accedido a su cuenta exitosamente" });
    }         
       

  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Ocurrió un error en el servidor al ingresar a la cuenta" });
  }
};






