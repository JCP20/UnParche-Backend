import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import JWTGenerator from "../../../helpers/jwt";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userUpdated = await UserModel.findByIdAndUpdate(id, {
      verified: req.body.verified,
    });

    if (userUpdated) {
      // Generate JWT
      const token = await JWTGenerator.generateToken(
        userUpdated.id,
        userUpdated.username
      );

      return res
        .status(200)
        .json({
          ok: true,
          msg: "Verificación exitosa",
          data: { token, id: userUpdated.id, username: userUpdated.username },
        });
    } else {
      return res.status(404).json({ ok: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
