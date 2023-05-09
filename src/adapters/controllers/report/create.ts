import { Request, Response } from "express";
import ReportModel from "../../../models/Report.model";

export const create = async (req: Request, res: Response) => {
    try {
      const newReport = new ReportModel(req.body);
  
      const savedReport = await newReport.save();
  
      return res
        .status(200)
        .json({ ok: true, msg: "Report created", data: savedReport });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ ok: false, msg: "Error en la creación de la denuncia" });
    }
};
