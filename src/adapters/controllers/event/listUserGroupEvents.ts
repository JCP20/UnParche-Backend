import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";

// Controller for the My Events tab
export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const page = parseInt(req.params.page) || 1; // Current page number, defaulting to 1
    const limit = parseInt(req.params.limit) || 10; // Number of items to return per page, defaulting to 10

    const skip = (page - 1) * limit;

    const groups = await GroupModel.find(
      {
        $or: [{ members: userId }, { administrators: userId }],
      },
      {
        _id: 1,
      }
    );

    // based on the groups id retrieve events
    const events = await EventModel.find({
      group: { $in: groups },
    })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({ ok: true, data: events });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
