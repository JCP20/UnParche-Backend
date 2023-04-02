import { Request, Response } from "express";
import JWTGenerator from "../../../helpers/jwt";

export const revalidateToken = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.body;

    const token = await JWTGenerator.generateToken(id, username);

    return res.status(200).json({ ok: true, token, data: { id, username } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
