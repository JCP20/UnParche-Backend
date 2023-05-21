
import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";
import quitGroupFacade from "../../facades/user/quitGroup.facade";

export const quitGroup = async (req: Request, res: Response) => {
  let userFacade = new quitGroupFacade();  
  const { username, name } = req.body;
  
  const result = await userFacade.quitGroup(username,name);
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