import { Request, Response } from "express";
import Event from "../../../models/Event.model";

export const getByGroup = async (req: Request, res: Response) => {
  try {
    //find events by group
    const events = await Event.find({ group: req.params.groupId });

    return res.status(200).json({ ok: true, data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};
