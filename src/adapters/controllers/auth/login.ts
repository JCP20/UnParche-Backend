import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../../../domain/entities/users";
import JWTGenerator from "../../../helpers/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const currentUser: IUser | null = await UserModel.findOne({ email });

    if (!currentUser) {
      //Se verifica que el nombre de usuario exista
      return res
        .status(404)
        .json({ ok: false, msg: "El correo dado no se encuentra registrado" });
    }

    if (!currentUser.verified) {
      //Se verifica que el usuario haya verificado su cuenta
      return res.status(401).json({
        ok: false,
        msg: "Debes verificar tu cuenta para poder ingresar",
      });
    }

    const passwordMatches = bcrypt.compareSync(password, currentUser.password);

    //Se verifica que la contraseña sea correcta
    if (!passwordMatches) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña es incorrecta, vuelva a intentarlo",
      });
    }

    const accessToken = await JWTGenerator.generateAccessToken({
      id: currentUser.id,
      username: currentUser.username,
    });

    const refresh = await JWTGenerator.generateRefreshToken({
      id: currentUser.id,
      username: currentUser.username,
    });

    return res.status(200).json({
      ok: true,
      msg: "El usuario ha ingresado con éxito a su cuenta",
      id: currentUser.id,
      username: currentUser.username,
      token: accessToken,
      refresh,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al ingresar a la cuenta",
    });
  }
};
