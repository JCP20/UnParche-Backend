import Event from "../../../models/Event.model";
import { Request, Response } from "express";
import EditEventFacade from "../../facades/event/editEvent.facade";

export const updateEvent = async (req: Request, res: Response) => {
  const update =new EditEventFacade();
    const { id } = req.params;

    const result = await update.updateEvent(id, req.body);

    if(result.success){
      return res
      .status(200)
      .json({ ok: true, message: "Evento actualizado", data: result.data });

    }else{
      return res
      .status(400)
      .json({ ok: false, message: result.msg });
    }    
};
