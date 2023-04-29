import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const Register = async (req: Request, res: Response) => {
  const { category, name, description, members, administrators } = req.body;
  //verificaciones, despues se haran con express validator
  try {
    const grupoExistente: IGroup | null = await GroupModel.findOne({ name });
    if (grupoExistente) {
      return res.status(400).json({
        ok: false,
        msg: "Nombre de grupo ya registrado",
      });
    }
    const categories = [
      "Arte",
      "Deporte",
      "Religión",
      "Investigación",
      "Semillero",
      "Videojuegos",
      "Otro",
    ];
    if (!categories.includes(category)) {
      return res.status(400).json({
        ok: false,
        msg: "La categoria no existe",
      });
    }
    const nuevoGrupo = new GroupModel({
      category,
      name,
      description,
      members,
      administrators,
    });
    await nuevoGrupo.save();
    return res.status(200).json({
      ok: true,
      msg: "grupo registrado",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ok: false,
      msg: "Error en registro de grupo",
    });
  }
};
