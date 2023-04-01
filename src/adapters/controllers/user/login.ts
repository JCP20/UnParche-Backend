import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../../../domain/entities/users";


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
        return res.status(500).json({
          ok: false,
          msg: "Error al verificar la contraseña",
        });
        
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
