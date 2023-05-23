import { Request, Response } from "express";
import Event from "../../../models/Event.model";

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    return res.status(200).json({ ok: true, data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};
