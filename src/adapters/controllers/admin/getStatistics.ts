import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";

export const getStatistics = async (req: Request, res: Response) => {
  const totalUsers = await UserModel.countDocuments();
  const totalGroups = await GroupModel.countDocuments();
  const totalEvents = await EventModel.countDocuments();

  return res
    .status(200)
    .json({ ok: true, data: { totalUsers, totalGroups, totalEvents } });
};
