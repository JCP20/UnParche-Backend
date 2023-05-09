import ReportModel from "../../../models/Report.model";
import { Request, Response } from "express";

export const getByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    // find reports by event
    const reports = await ReportModel.find({ eventId: eventId });

    return res.status(200).json({ ok: true, data: reports });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo reportes por evento" });
  }
};