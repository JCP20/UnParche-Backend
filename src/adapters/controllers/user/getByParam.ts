import UserModel from "../../../models/User.model";
import { Request, Response} from "express";

//initialization of the function
export const getUserByParam = async (req: Request, res: Response) => {
//try-catch statement
    try {
        //request the information from the url
        const {username} = req.body;
        //obtaing the information from the database
        //need to search from the categories and the name, get every group that contain the substring name
            const users = await UserModel.find({
                username: { $regex: username, $options: "i" },
            });
            //if users is empty, search by email
            if (users.length === 0) {
                console.log("reached")
                const users = await UserModel.find({
                    email: { $regex: username, $options: "i" },
                });
                return res.status(200).json({ ok: true, users});}
            return res.status(200).json({ ok: true, users}); 
    } catch (error) {
        //console log the error
        console.log(error);
        //return the status 500 with the message
        return res.status(500).json({ ok: false, msg: "Error al obtener la información de usuarios" });
    }

}