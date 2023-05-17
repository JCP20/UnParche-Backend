import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWTGenerator from "../../../helpers/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    const { email, password } = req.body;

    const currentUser = await UserModel.findOne({ email });

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

    // Generate JWTs
    const accessToken = await JWTGenerator.generateAccessToken({
      id: currentUser.id,
      username: currentUser.username,
    });

    const refreshToken = await JWTGenerator.generateRefreshToken({
      id: currentUser.id,
      username: currentUser.username,
    });

    currentUser.refreshToken = refreshToken;

    await currentUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      ok: true,
      msg: "El usuario ha ingresado con éxito a su cuenta",
      id: currentUser.id,
      username: currentUser.username,
      token: accessToken,
      role: currentUser.role,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error en el servidor al ingresar a la cuenta",
    });
  }
};
