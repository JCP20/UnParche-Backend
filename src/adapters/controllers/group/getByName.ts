import { Request, Response} from "express";
import GetGroups from "../../facades/group/getGroups.facade";

export const getGroupByName = async (req: Request, res: Response) => {

  //obtener la informacion del grupo deseado
  const search = new GetGroups();
  const group_name = req.params.name;
  const result = await search.getGroupByName(group_name);
  if (result.success) {
    if(result.data){
      return res.status(200).json({ success: true, data: result.data });
    }else{
      return res.status(404).json({ success: false, msg: "El grupo no existe" });
    }
  } else {
    return res.status(500).json({ success: false, msg: result.msg });
  }
  
};