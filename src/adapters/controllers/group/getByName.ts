import GroupModel from "../../../models/Group.model";
import { Request, Response} from "express";

export const getGroupByName = async (req: Request, res: Response) => {
    try {
      //obtener la informacion del grupo deseado
      const group_name = req.params.name;
      const group = await GroupModel.findOne({name: group_name}); 
      if (group) {
        return res.status(200).json({ ok: true, data: group });
      } else {
        return res.status(404).json({ ok: false, msg: "Grupo no encontrado" });
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, msg: "Error al obtener la información del grupo" });
    }
  };