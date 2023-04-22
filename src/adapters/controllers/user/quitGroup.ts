
import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const quitGroup = async (req: Request, res: Response) => {
    const { username, name } = req.body;
    try {
      // Find the user by username
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
      }
  
      // Find the group by name
      const group = await GroupModel.findOne({ name });
      if (!group) {
        return res.status(404).json({ ok: false, msg: "Grupo no encontrado" });
      }

    // Check if the group is already in the user's groups
    const index = user.groups.indexOf(group.id);
    if (index !== -1) {
      // Remove the group from the user's groups

      user.groups.splice(index, 1);

      console.log(user.groups);
    } else {
      return res.status(400).json({ ok: false, msg: "El usuario no esta inscrito en este grupo" });
    }

  
      return res.json({ ok: true, msg: "Usuario eliminado del grupo" });

    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ ok: false, msg: "No se pudo eliminar el grupo del usuario" });
    }
  };