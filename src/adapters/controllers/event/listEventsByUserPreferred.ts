import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";

// Controller for the FYP tab
export const getFYPEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const preferredCategories = user.preferredCategories;

    const page = parseInt(req.params.page) || 1; // Current page number, defaulting to 1

    const limit = parseInt(req.params.limit) || 10; // Number of items to return per page, defaulting to 10

    const skip = (page - 1) * limit;

    const groups = await GroupModel.find(
      {
        category: { $in: preferredCategories },
      },
      {
        _id: 1,
      }
    );

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
