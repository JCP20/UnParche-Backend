import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";
import { IEvent } from "../../../domain/entities/events";
import { check, validationResult } from "express-validator";

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventDeleted = await EventModel.findByIdAndDelete(id);

    if (!eventDeleted) {
      return res
        .status(400)
        .json({ ok: false, message: "No se pudo eliminar el evento" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Evento eliminado", data: eventDeleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error en el servidor al eliminar el evento",
    });
  }
};
