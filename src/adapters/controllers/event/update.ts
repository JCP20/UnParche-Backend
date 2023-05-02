import Event from "../../../models/Event.model";
import { Request, Response } from "express";

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const actualEvent = Event.findByIdAndUpdate(id, req.body);

    if (!actualEvent) {
      return res
        .status(400)
        .json({ ok: false, message: "No se pudo actualizar el evento" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Evento actualizado", data: actualEvent });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ ok: false, message: "Error actualizando el evento" });
  }
};
