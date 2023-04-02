import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../../../domain/entities/users";
import JWTGenerator from "../../../helpers/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    // El usuario ingrese a la cuenta
    const { email, password } = req.body;
    //key puede referirse al username o al email
    const currentUser: IUser | null = await UserModel.findOne({ email });

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

    if (!currentUser) {
      //Se verifica que el nombre de usuario o correo correspondan a algun usuario registrado
      return res
        .status(404)
        .json({ ok: false, msg: "El correo dado no se encuentra registrado" });
    }

    //se verifica que la contraseña sea correcta
    bcrypt.compare(password, currentUser.password, async (err, matches) => {
      if (err) {
        console.log("Error while checking password");
        return res.status(500).json({
          ok: false,
          msg: "Error al verificar la contraseña",
        });
      }

      if (!matches) {
        console.log("The password does NOT match!");
        return res.status(400).json({
          ok: false,
          msg: "La contraseña es incorrecta, vuelva a intentarlo",
        });
      }

      if (!currentUser.verified) {
        console.log("User has not verified their account");
        return res.status(401).json({
          ok: false,
          msg: "Debes verificar tu cuenta para poder ingresar",
        });
      }

      // Generate JWT
      const token = await JWTGenerator.generateToken(
        currentUser.id,
        currentUser.username
      );

      return res.status(200).json({
        ok: true,
        msg: "El usuario ha ingresado con éxito a su cuenta",
        id: currentUser.id,
        username: currentUser.username,
        token,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al ingresar a la cuenta",
    });
  }
};
