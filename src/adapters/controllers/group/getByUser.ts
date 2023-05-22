import { Request, Response} from "express";
import mongoose from "mongoose";
import GetGroups from "../../facades/group/getGroups.facade";

export const getGroupsfromUser = async (req: Request, res: Response) => {

  // retornar los grupos dado el usuario
  const search = new GetGroups();
  const current_user = req.params.userId;
  const result = await search.getGroupsByUser(current_user);
  if (result.success) {
    if(result.data){
      return res.status(200).json({ success: true, data: result.data });
    }else{
      return res.status(404).json({ success: false, msg: "El usuario no pertenece a ningún grupo" });
    }
  } else {
    return res.status(500).json({ success: false, msg: result.msg });
  }
  
};