import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import EditUserFacade from "../../facades/user/editUser.facade";

export const updateUser = async (req: Request, res: Response) => {
  let update = new EditUserFacade();
  const { id } = req.params;
  const userData = req.body;

  const result = await update.editUser(id, userData);

  if(result.success){
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  }else{
    return res.status(400).json({
      success: false,
      data: result.msg,
    });
  }
};
