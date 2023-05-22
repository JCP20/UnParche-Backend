import { Request, Response } from "express";
import ReportModel from "../../../models/Report.model";

export const deleteReportsByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const reportsUpdated = await ReportModel.deleteMany(
      { event: eventId },
      { $set: { event: null } }
    );

    if (!reportsUpdated) {
      return res
        .status(400)
        .json({ ok: false, message: "No se pudo actualizar el evento" });
    }

    return res.status(200).json({
      ok: true,
      message: "Evento actualizado",
      data: reportsUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: "Ocurrió un error en el servidor al eliminar el evento",
    });
  }
};
