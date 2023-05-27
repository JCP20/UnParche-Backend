import { Request, Response } from "express";
import Event from "../../../models/Event.model";

export const getByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    // find events by name
    const events = await Event.find({ title: name });

    return res.status(200).json({ ok: true, data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};
