import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import JWTGenerator from "../../../helpers/jwt";
import { IPayloadJWT } from "../../../domain/entities/users";

export const revalidateToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.header("x-token-refresh");
    if (refreshToken) {
      const { id, username } = jwt.verify(
        refreshToken,
        process.env.SECRET_JWT_SEED_REFRESH ?? ""
      ) as IPayloadJWT;

      const newAccessToken = await JWTGenerator.generateAccessToken({
        id,
        username,
      });

      const refresh = await JWTGenerator.generateRefreshToken({
        id,
        username,
      });

      return res.status(200).json({
        ok: true,
        token: newAccessToken,
        refresh,
        data: { id, username },
      });
    } else {
      return res.status(401).json({ ok: false, msg: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
