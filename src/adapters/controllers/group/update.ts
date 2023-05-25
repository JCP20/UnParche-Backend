import { Request, Response } from "express";
import EditGroupFacade from "../../facades/group/editGroup.facade";

export const Update = async (req: Request, res: Response) => {
  const { category, name, description, members, administrators } = req.body;
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  
  const update = new EditGroupFacade();
  const result = await update.editGroup(groupId,userId,category,name,description,members,administrators);

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
