import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";

export const updateGroup = async (req: Request, res: Response) => {
  const { category, name, description, members, administrators, photo } =
    req.body;
  const groupId = req.params.groupId;
  const userId = req.body.userId;

  try {
    const existingGroup = await GroupModel.findOne({
      $or: [{ name }],
      _id: { $ne: groupId },
    });

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
      return res.status(400).json({ ok: false, msg: "La categoría no existe" });
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

    if (!group.administrators.includes(userId)) {
      return res.status(403).json({
        ok: false,
        msg: "El usuario no es administrador del grupo a editar",
      });
    }

    group.category = category;
    group.name = name;
    group.description = description;
    group.members = members;
    group.administrators = administrators;
    group.photo = photo;

    await GroupModel.updateOne({ _id: groupId }, group);

    return res.status(200).json({ ok: true, msg: "Grupo actualizado" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ ok: false, msg: "Error actualizando grupo" });
  }
};
