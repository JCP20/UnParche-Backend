import GroupModel from "../../../models/Group.model";
import { Request, Response} from "express";

//initialization of the function
export const getGroupByParam = async (req: Request, res: Response) => {
//try-catch statement
    try {
        //request the information from the petition
        const { categories, name} = req.body;
        //obtaing the information from the database
        //need to search from the categories and the name, get every group that contain the substring name
        if (categories.length === 0) {
            const groups = await GroupModel.find({
                name: { $regex: name, $options: "i" }
            });
            return res.status(200).json({ ok: true, groups});
        }

        const groups = await GroupModel.find({
            name: { $regex: name, $options: "i" },
            category: { $in: categories }
        });
        return res.status(200).json({ ok: true, groups});
    } catch (error) {
        //console log the error
        console.log(error);
        //return the status 500 with the message
        return res.status(500).json({ ok: false, msg: "Error al obtener la información del grupo" });
    }

}