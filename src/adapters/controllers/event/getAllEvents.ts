import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";

export const getAllEvents = async (req: Request, res: Response) => {
    try {
      // retornar todos los gruposs registrados
      const eventos = await EventModel.find({});
      return res.status(200).json({ ok: true, data: eventos});
    } catch (error) {

      console.log(error);
      return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
    }
};