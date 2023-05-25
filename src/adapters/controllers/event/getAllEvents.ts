import { Request, Response } from "express";
import GetEventsFacade from "../../facades/event/searchEvents.facade";

export const getAllEvents = async (req: Request, res: Response) => {

  const search = new GetEventsFacade();
  // retornar todos los eventos
  const result = await search.getAll();
    if(result.success){
      return res.status(200).json({ ok: true, data: result.data });
    }else{
      return res.status(500).json({ ok: true, msg: result.msg });
    }
};
