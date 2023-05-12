import { Request, Response } from "express";
import Group from "../../../models/Group.model";

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);

    if (group) {
      return res.status(200).json({ ok: true, data: group });
    } else {
      return res.status(404).json({ ok: false, msg: "Grupo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Ha ocurrido un error" });
  }
};
