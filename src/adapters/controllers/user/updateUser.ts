import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userUpdated = await UserModel.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .json({ ok: true, msg: "Actualización exitosa", data: userUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
