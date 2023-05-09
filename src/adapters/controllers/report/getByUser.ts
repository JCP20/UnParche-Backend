import ReportModel from "../../../models/Report.model";
import { Request, Response } from "express";

export const getByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // find reports by user
    const reports = await ReportModel.find({ userId: userId });

    return res.status(200).json({ ok: true, data: reports });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo reportes por usuario" });
  }
};