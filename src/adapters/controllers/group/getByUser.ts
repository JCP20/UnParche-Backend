import mongoose from "mongoose";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const getGroupsfromUser = async (req: Request, res: Response) => {
  try {
    // retornar los grupos dado el usuario
    const user_groups = await GroupModel.find({
      $or: [
        {
          administrators: {
            $in: [req.params.id],
          },
        },
        {
          members: {
            $in: [req.params.id],
          },
        },
      ],
    }).select("-photo");

    if (user_groups) {
      return res.status(200).json({ ok: true, data: user_groups });
    } else {
      return res
        .status(404)
        .json({ ok: false, msg: "El usuario no pertenece a ningún grupo" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al obtener los grupos del usuario" });
  }
};
