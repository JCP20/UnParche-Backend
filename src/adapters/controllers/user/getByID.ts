import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import GetUsers from "../../facades/user/getUsers.facade";


export const getUserById = async (req: Request, res: Response) => {
  let getUsers = new GetUsers();
  // Obtener un usuario por su id
  const { id } = req.params;
  const result = await getUsers.getUserByID(id);
  if (result.success) {
    if(result.data){
      return res.status(200).json({ ok: true, data: result.data });
    }else{
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }
  } else {
    return res.status(400).json({ ok: false, msg: result.msg });
  }
};
