import { Request, Response } from "express";
import verifyEmailFacade from "../../facades/auth/verifyEmail.facade";

export const verifyEmail = async (req: Request, res: Response) => {
  const verify = new verifyEmailFacade()
  const { id } = req.params;

  const result = await verify.verifyEmail(id);

  if(result.success){
  
    res.cookie("jwt", result.token, {
      httpOnly: true,
      // secure: true,
      // sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      ok: true,
      msg: result.msg,
      data: result.data,
    });

  } else {
    
    return res.status(500).json({ ok: false, msg: result.msg });
  }
};
