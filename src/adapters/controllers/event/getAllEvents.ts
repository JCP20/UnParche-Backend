import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    // retornar todos los eventos
    const eventos = await EventModel.find({}).populate("group");
    return res.status(200).json({ ok: true, data: eventos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};
