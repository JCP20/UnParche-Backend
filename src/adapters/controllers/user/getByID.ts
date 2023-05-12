import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Obtener un usuario por su id
    const { id } = req.params;
    // exclude username prop from the query

    const usuario = await UserModel.findById(id, {
      refreshToken: 0,
      password: 0,
    });
    if (usuario) {
      return res.status(200).json({ ok: true, data: usuario });
    } else {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Ha ocurrido un error" });
  }
};
