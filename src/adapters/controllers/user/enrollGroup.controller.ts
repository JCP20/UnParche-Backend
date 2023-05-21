import { Request, Response } from "express";
import enrollGroupFacade from "../../facades/user/enrollGroup.facade";

export const enrollGroup = async (req: Request, res: Response) => {
    const {username, name } = req.body; 
    const userFacade = new enrollGroupFacade();

    const result = await userFacade.enrollGroup(username, name);  
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

  
  
  