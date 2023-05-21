import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IPayloadJWT } from "../../domain/entities/users";

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, msg: "Token was not found in the request" });
  }

  try {
    const { id, username }: IPayloadJWT = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED_ACCESS ?? ""
    ) as IPayloadJWT;
    req.body.userId = id;
    req.body.username = username;
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "Token is not valid" });
  }

  next();
};
