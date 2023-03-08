import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IPayloadJWT } from "../interfaces";

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
    const { uid, name }: IPayloadJWT = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED as string
    ) as IPayloadJWT;
    req.body.uid = uid;
    req.body.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ ok: false, msg: "Token is not valid" });
  }

  next();
};
