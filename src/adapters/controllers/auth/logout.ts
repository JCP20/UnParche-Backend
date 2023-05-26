import { Request, Response } from "express";

import logoutUserFacade from "../../facades/auth/logout.facade";
export const logoutUser = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(204).json({ ok: true, msg: "No content" });
    }

    const refreshToken = cookies.jwt;
    const logout = new logoutUserFacade();
    const result = await logout.logout(refreshToken);
    if(result.success){
      res.clearCookie("jwt");
      return res.status(200).json({
        ok: true,
        msg: result.msg,
      });
    }
    return res.status(400).json({
      ok: false,
      msg: result.msg,
    });
    
};
