import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";


export const getUsersFromGroup = async (req: Request, res: Response) => {
  try {
    // Obtener los usuarios unidos a un grupo
    const current_group = await GroupModel.findById(req.params.groupId);
    console.log(current_group);
    if (current_group) {
      return res.status(200).json({ ok: true, data: current_group.members });
    } else {
      return res.status(404).json({ ok: false, msg: "Grupo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Ha ocurrido un error en el servidor" });
  }
};