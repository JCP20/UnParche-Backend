import mongoose from "mongoose";
import Event from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const getByGroup = async (req: Request, res: Response) => {
  try {
    const current_group = new mongoose.Types.ObjectId(req.params.groupId);

    //find events by group
    const events = await Event.find({ group: current_group });

    return res.status(200).json({ ok: true, data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};