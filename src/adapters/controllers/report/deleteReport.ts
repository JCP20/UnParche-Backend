import ReportModel from "../../../models/Report.model";
import { Request, Response } from "express";

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reportDeleted = await ReportModel.findByIdAndDelete(id);

    if (!reportDeleted) {
      return res
        .status(404)
        .json({ ok: false, message: "No se pudo eliminar el reporte" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Reporte eliminado", data: reportDeleted });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        ok: false,
        mensaje: "Ocurrió un error en el servidor al eliminar el reporte",
      });
  }
};
