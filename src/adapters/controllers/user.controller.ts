import UserModel from "../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../../domain/entities/users";
import { sendEmail } from "../../helpers/email";
import { verificarUsuario } from "../../helpers/emails/verificarUsuario";

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

export const Register = async (req: Request, res: Response) => {
  //registro de usuario
  try {
    // Validar existencia de la información del usuario
    const { email, password, username, password_confirmation } = req.body;
    // Verificar si ya existe un usuario con el correo electrónico proporcionado
    const usuarioExistente: IUser | null = await UserModel.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo electrónico",
      });
    }

    // Verificar si el correo es institucional
    if (!email.includes("@unal.edu.co")) {
      return res.status(400).json({
        ok: false,
        msg: "Debe registrarse con su correo institucional",
      });
    }

    //verificar que las contraseñas coincidan
    if (password != password_confirmation) {
      return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    }

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
    // Encriptar contraseña
    const salt: string = await bcrypt.genSalt(10);
    const passwordCrypt: string = await bcrypt.hash(password, salt);

    // Crear una nueva instancia del modelo de usuario y guardarla en la base de datos
    const nuevoUsuario = new UserModel({
      email,
      username,
      password: passwordCrypt,
      verified: false,
    });

    await nuevoUsuario.save();

    await sendEmail(
      nuevoUsuario.email,
      "[UNParche] Verifica tu correo electrónico",
      verificarUsuario(
        nuevoUsuario.username,
        `http://localhost:3000/verificar/${nuevoUsuario.id}`
      )
    );

    return res
      .status(201)
      .json({ ok: true, mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al registrar el usuario",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // El usuario ingrese a la cuenta
    const { email, password } = req.body;
    //key puede referirse al username o al email
    const currentUserk: IUser | null = await UserModel.findOne({ email });

    /** Se debe especificar si de ha dado el correo o el nombre de usuario,
     * por ahora se implementa sólo con email,
     * luego miramos cómo hacerlo para usuario
     */

    if (!email || !password) {
      //Se verifica que estén los datos pedidos
      return res.status(400).json({
        ok: false,
        msg: "Por favor, proporcione todos los datos requeridos",
      });
    }

    if (!currentUserk) {
      //Se verifica que el nombre de usuario o correo correspondan a algun usuario registrado
      return res
        .status(404)
        .json({ ok: false, msg: "El correo dado no se encuentra registrado" });
    }

    //se verifica que la contraseña sea correcta
    bcrypt.compare(password, currentUserk.password, function (err, matches) {
      if (err) {
        console.log("Error while checking password");
        return res
          .status(500)
          .json({ ok: false, msg: "Error al verificar la contraseña" });
      } else if (matches) {
        console.log("The password matches!");

        if (!currentUserk.verified) {
          //Se revisa que el usuario haya verificado su cuenta al momento de registrarse
          return res.status(401).json({
            ok: false,
            msg: "Debes verificar tu cuenta para poder ingresar",
          });
        } else {
          return res.status(401).json({
            ok: true,
            msg: "El usuario ha ingresado con éxito a su cuenta",
          });
        }
      } else {
        console.log("The password does NOT match!");
        return res.status(400).json({
          ok: false,
          msg: "La contraseña es incorrecta, vuelva a intentarlo",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al ingresar a la cuenta",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Obtener un usuario por su id
    const { id } = req.params;
    const usuario = await UserModel.findById(id);
    if (usuario) {
      return res.status(200).json({ ok: true, data: usuario });
    } else {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Ha ocurrido un error" });
  }
};
