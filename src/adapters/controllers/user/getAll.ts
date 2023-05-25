import { Request, Response } from "express";
import GetUsers from "../../facades/user/searchUsers.facade";

export const getAllUsers = async (req: Request, res: Response) => {
  let getUsers = new GetUsers();
  // retornar todos los usuarios registrados
  const result = await getUsers.getAllUsers();
  if(result.success === true){
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  }else{
    return res.status(500).json({
      success: false,
      msg: result.msg,
    });
  }
};
