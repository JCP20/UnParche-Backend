import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new EventModel(req.body);

    const savedEvent = await newEvent.save();

    return res
      .status(200)
      .json({ ok: true, msg: "Event created", data: savedEvent });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ ok: false, msg: "Error en la creación del evento" });
  }
};
