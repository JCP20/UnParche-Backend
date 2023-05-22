import { Request, Response } from "express";
import VerifyUserFacade from "../../facades/user/authUser.facade";

//registro de usuario
export const register = async (req: Request, res: Response) => {
  // Validar existencia de la información del usuario
  const { email, password, username} = req.body;

  const verification = new VerifyUserFacade();
  const result = await verification.register(email,password,username);  
  if(result.success === true){
    return res.status(200).json({
      success: true,
      msg: result.msg,
    });
  }else{
    return res.status(400).json({
      success: false,
      msg: result.msg,
    });
  }

};
