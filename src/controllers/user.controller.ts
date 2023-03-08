import UserModel from "../models/User.model";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // retornar todos los usuarios registrados
    const users = await UserModel.find({});
    return res.status(200).json({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
