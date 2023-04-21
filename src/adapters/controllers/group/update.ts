import GroupModel from "../../../models/Group.model";
import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const Update = async (req: Request, res: Response) => {
  const { category, name, description, members, administrators } = req.body;
  const groupId = req.params.id;
  const userId = req.params.user;
  try {
    const existingGroup = await GroupModel.findOne({
      $or: [{ name }],
      _id: { $ne: groupId },
    });
    
    //validaciones, mas adelante se haran con express validator
    const categories = [
      "Arte",
      "Deporte",
      "Religion",
      "Investigacion",
      "Semillero",
      "Videojuegos",
      "Otro",
    ];
    if (!categories.includes(category)) {
      return res.status(400).json({ ok: false, msg: "La categoria no existe" });
    }
    if (existingGroup) {
      return res
        .status(400)
        .json({ ok: false, msg: "El nombre ya esta registrado" });
    }
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res
        .status(400)
        .json({ ok: false, msg: "El grupo no esta registrado" });
    }
    if(group.administrators != userId){
      return res
        .status(403)
        .json({ ok: false, msg: "El usuario no es administrador del grupo a editar" });
    }
    group.category = category;
    group.name = name;
    group.description = description;
    group.members = members;
    group.administrators = administrators;
    await group.save();
    return res.status(200).json({
      ok: true,
      msg: "Grupo actualizado",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ ok: false, msg: "Error actualizando grupo" });
  }
};
