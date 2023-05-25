import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";
import deleteEventFacade from "../../facades/event/deleteEvent.facade";

export const deleteEvent = async (req: Request, res: Response) => {
  
  const deleteFacade = new deleteEventFacade();
  const { id } = req.params;

  const result = await deleteFacade.delete(id);

    if (result.success) {
      
      return res
      .status(200)
      .json({ ok: true, message: result.msg, data: result.data });
      
    }else{
      return res
        .status(400)
        .json({ ok: false, message: result.msg });
    }

    
};
