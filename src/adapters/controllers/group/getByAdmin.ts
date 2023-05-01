import mongoose from "mongoose";
import GroupModel from "../../../models/Group.model";
import { Request, Response} from "express";

export const getGroupsfromAdmin = async (req: Request, res: Response) => {
    try {
      // retornar los grupos dado el usuario
      const current_user = new mongoose.Types.ObjectId(req.params.userId);
      const user_groups = await GroupModel.find({administrators:current_user});
      if (user_groups) {
        return res.status(200).json({ ok: true, data: user_groups });
      } else {
        return res.status(404).json({ ok: false, msg: "El usuario no administra ningún grupo" });
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, msg: "Error al obtener los grupos administrados por el usuario" });
    }
  };