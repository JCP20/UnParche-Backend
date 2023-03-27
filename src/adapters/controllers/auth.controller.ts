import { Request, Response } from "express";
import { generateJWT } from "../../helpers/jwt";

export const revalidateToken = async (req: Request, res: Response) => {
  try {
    const { uid, name } = req.body;

    const token = await generateJWT(uid, name);

    return res.status(200).json({ ok: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
