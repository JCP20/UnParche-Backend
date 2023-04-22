
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

      // Remove the group from the user's groups
      if (user.groups.includes(group.id)) {
        console.log(user.groups)
          /*
        user.groups = user.groups.filter((groupId) => groupId !== group.id);
          */
        await user.save();
      }
  
      return res.json({ ok: true, msg: "Grupo eliminado del usuario" });

    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ ok: false, msg: "No se pudo eliminar el grupo del usuario" });
    }
  };