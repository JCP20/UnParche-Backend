import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const nuevoGrupo = new GroupModel(req.body);

    await nuevoGrupo.save();
    return res.status(200).json({
      ok: true,
      msg: "Grupo registrado",
      data: nuevoGrupo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ok: false,
      msg: "Error en registro de grupo",
    });
  }
};
