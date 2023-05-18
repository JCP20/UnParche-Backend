import { Request, Response } from "express";
import { IUser } from "../../../domain/entities/users";
import UserModel from "../../../models/User.model";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtén el ID del grupo

    // Verifica si existe un grupo con el ID proporcionado
    const user: IUser | null = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "No se encontró el usuario" });
    }

    return res
      .status(200)
      .json({ ok: true, mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error en el servidor al eliminar el usuario",
    });
  }
};
