import { Request, Response } from "express";
import GetGroups from "../../facades/group/getGroups.facade";

export const getAllGroups = async (req: Request, res: Response) => {
    // retornar todos los grupos registrados
    const search = new GetGroups();
    const result = await search.getAllGroups();
    if (result.success) {
      return res.status(200).json({ success: true, data: result.data });
    } else {
      return res.status(500).json({ success: false, msg: result.msg });
    }
};
