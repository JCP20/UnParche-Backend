import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import JWTGenerator from "../../../helpers/jwt";
import UserModel from "../../../models/User.model";

export const revalidateToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    console.log(cookies);

    if (!cookies?.jwt) {
      return res.status(401).json({ ok: false, msg: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    // Clean last refresh token
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    });

    const foundUser = await UserModel.findOne({ refreshToken });

    // Detect refresh token reuse
    if (!foundUser) {
      jwt.verify(
        refreshToken,
        process.env.SECRET_JWT_SEED_REFRESH ?? "",
        async (err: any, decoded: any) => {
          if (err) return res.status(403).json({ ok: false, msg: "Forbidden" });

          const hackedUser = await UserModel.findOne({
            username: decoded.username,
          });

          if (!hackedUser) {
            res.status(404).json({ ok: false, msg: "User not found" });
          } else {
            hackedUser.refreshToken = "";
            await hackedUser.save();
          }
        }
      );
      return res.status(403).json({ ok: false, msg: "Forbidden" });
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.SECRET_JWT_SEED_REFRESH ?? "",
      async (err: any, decoded: any) => {
        if (err) {
          foundUser.refreshToken = "";
          await foundUser.save();
        }

        if (err || foundUser.username !== decoded.username) {
          res.status(403).json({ ok: false, msg: "Forbidden" });
        }

        // Refresh token was still valid
        const accessToken = await JWTGenerator.generateAccessToken({
          id: foundUser.id,
          username: foundUser.username,
        });

        const newRefreshToken = await JWTGenerator.generateRefreshToken({
          id: foundUser.id,
          username: foundUser.username,
        });

        foundUser.refreshToken = newRefreshToken;
        await foundUser.save();

        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          // secure: true,
          // sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
          ok: true,
          token: accessToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Contact an admin" });
  }
};
