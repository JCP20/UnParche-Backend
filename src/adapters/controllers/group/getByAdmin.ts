import { Request, Response} from "express";
import GetGroups from "../../facades/group/searchGroups.facade";

export const getGroupsfromAdmin = async (req: Request, res: Response) => {

  // retornar los grupos dado el usuario que lo administra
  const search = new GetGroups();
  const current_admin = req.params.userId;
  const result = await search.getGroupsByAdmin(current_admin);
  if (result.success) {
    if(result.data){
      return res.status(200).json({ success: true, data: result.data });
    }else{
      return res.status(404).json({ success: false, msg: "El usuario no administra ningún grupo" });
    }
  } else {
    return res.status(500).json({ success: false, msg: result.msg });
  }
};