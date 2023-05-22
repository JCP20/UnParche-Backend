import { Request, Response } from "express";
import GetEventsFacade from "../../facades/event/getEvents.facade";

export const getByUser = async (req: Request, res: Response) => {
  const search = new GetEventsFacade();
  const { id } = req.params;

  // find events by user
  const result = await search.getByUser(id);

  if(result.success){
    return res.status(200).json({ success: true, data: result.data });
  }else{
    return res.status(500).json({ success: false, msg: result.msg });
  } 

};
