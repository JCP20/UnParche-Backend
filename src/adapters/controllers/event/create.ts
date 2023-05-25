import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import CreateEventFacade from "../../facades/event/createEvent.facade";

export const createEvent = async (req: Request, res: Response) => {
  const createEvent = new CreateEventFacade();
  const result = await createEvent.create(req.body);

  if(result.success){
    return { ok: true, msg: "Event created", data: result.data };
  }else{
    return { ok: false, msg: result.msg };
  }  
};
