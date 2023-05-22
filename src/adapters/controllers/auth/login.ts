import { Request, Response } from "express";
import AuthUserFacade from "../../facades/user/authUser.facade";


export const loginUser = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    const { email, password } = req.body;

    const verification = new AuthUserFacade();
    const result = await verification.login(email,password);  

    if(result.success === true){

      const [refreshToken, id, username, token] = result.ans ?? ['', '', '', ''];

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      });
  
      return res.status(200).json({
        ok: true,
        msg: result.msg,
        id: id,
        username: username,
        token: token,
      });

    }else{
      return res.status(400).json({
        success: false,
        msg: result.msg,
      });
    }

    

};
