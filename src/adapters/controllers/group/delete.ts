import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";
import { IGroup } from "../../../domain/entities/groups";

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtén el ID del grupo

    // Verifica si existe un grupo con el ID proporcionado
    const group: IGroup | null = await GroupModel.findByIdAndDelete(id);

    if (!group) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "No se encontró el grupo" });
    }

    return res
      .status(200)
      .json({ ok: true, mensaje: "Grupo eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error en el servidor al eliminar el grupo",
    });
  }
};
