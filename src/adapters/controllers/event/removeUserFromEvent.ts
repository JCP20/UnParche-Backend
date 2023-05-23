import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";

export const removeUserFromEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const eventUpdated = await EventModel.findByIdAndUpdate(
      id,
      { $pull: { users: userId } },
      { new: true }
    );

    if (!eventUpdated) {
      return res
        .status(400)
        .json({ ok: false, message: "No se pudo actualizar el evento" });
    }

    return res.status(200).json({ ok: true, message: "Evento actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error en el servidor al actualizar el evento",
    });
  }
};
