import ReportModel from "../../../models/Report.model";
import { Request, Response } from "express";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    // retornar todos los reportes
    const reports = await ReportModel.aggregate([
      {
        $group: {
          _id: "$event",
          count: { $sum: 1 },
          reports: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      {
        $lookup: {
          from: "users",
          localField: "reports.user",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
          _id: 0,
          event: 1,
          count: 1,
          reports: {
            $map: {
              input: "$reports",
              as: "report",
              in: {
                _id: "$$report._id",
                user: {
                  id: "$$report.user",
                  username: {
                    $arrayElemAt: [
                      "$users.username",
                      { $indexOfArray: ["$users._id", "$$report.user"] },
                    ],
                  },
                },
                reason: "$$report.reason",
              },
            },
          },
        },
      },
    ]);

    // group reports by event and add amount

    return res.status(200).json({ ok: true, data: reports });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error obteniendo denuncias" });
  }
};
