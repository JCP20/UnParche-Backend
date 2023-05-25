import { Request, Response } from "express";
import DeleteGroupFacade from "../../facades/group/deleteGroup.facade";

export const Delete = async (req: Request, res: Response) => {

  const deleteFacade = new DeleteGroupFacade();
  const { id } = req.params; // Obtén el ID del usuario a eliminar desde los parámetros de la solicitud

  const result = await deleteFacade.delete(id);
  
  if(result.success){
    res.status(200).json({success:true, msg: result.msg});
  }else{
    res.status(400).json({success:false, msg: result.msg});
  }
};
