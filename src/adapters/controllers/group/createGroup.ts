import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const grupoExistente: IGroup | null = await GroupModel.findOne({
      name: req.body.name,
    });

    if (grupoExistente) {
      return res.status(400).json({
        ok: false,
        msg: "Nombre de grupo ya registrado",
      });
    }

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
