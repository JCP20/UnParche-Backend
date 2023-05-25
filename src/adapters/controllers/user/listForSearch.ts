import { Request, Response } from "express";
import UserModel from "../../../models/User.model";

export const listUsersForSearch = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { userId } = req.body;

    const users = await UserModel.find({
      username: { $regex: username, $options: "i" },
      _id: { $ne: userId },
    }).select("username _id");

    res
      .status(200)
      .json({ ok: true, message: "listUsersForSearch", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
