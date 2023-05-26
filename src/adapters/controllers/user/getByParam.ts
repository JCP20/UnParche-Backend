import UserModel from "../../../models/User.model";
import { Request, Response} from "express";
import GetUsers from "../../facades/user/searchUsers.facade";
//initialization of the function
export const getUserByParam = async (req: Request, res: Response) => {
//try-catch statement
    try {
        let getUsers = new GetUsers();
        const {username} = req.body; 
        const result = await getUsers.getUserByParam(username);
        if (result.success){
            return res.status(200).json({ok:true, data: result.data});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Error al obtener la información de usuarios" });
    }

}