import { Request, Response} from "express";
import GetGroups from "../../facades/group/searchGroups.facade";
//initialization of the function
export const getGroupByParam = async (req: Request, res: Response) => {
    try {
        console.log("entro");
        const { categories, name} = req.body;
        const search = new GetGroups();
        const result = await search.getGroupsByParam(categories, name);
        if (result.success) {
            return res.status(200).json({ success: true, data: result.data });
        }
    } catch (error) {
        //console log the error
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Error en el servidor" });
    }
}
