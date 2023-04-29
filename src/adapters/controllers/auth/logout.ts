import { Request, Response } from "express";
import UserModel from "../../../models/User.model";

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(204).json({ ok: true, msg: "No content" });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await UserModel.findOne({ refreshToken });

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.status(204).json({ ok: true, msg: "No content" });
    }

    // Delete refresh token in db
    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(204).json({ ok: true, msg: "No content" });
  } catch (error) {}
};
