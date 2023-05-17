import ReportModel from "../../../models/Report.model";
import { Request, Response } from "express";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    // retornar todos los eventos
    const reports = await ReportModel.find({});
    return res.status(200).json({ ok: true, data: reports });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error obteniendo denuncias" });
  }
};
