import { Request, Response } from "express";
import RegisterGroupFacade from "../../facades/group/registerGroup.facade";

export const Register = async (req: Request, res: Response) => {
  const verification = new RegisterGroupFacade();
  const { category, name, description, members, administrators } = req.body;
  
  const result = await verification.register(category, name, description, members, administrators);

  if(result.success){
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
