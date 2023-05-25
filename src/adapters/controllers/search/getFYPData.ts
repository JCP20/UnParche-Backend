import { Request, Response } from "express";
import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import EventModel from "../../../models/Event.model";

export const getMixedData = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const preferredCategories = user.preferredCategories;

    const page = parseInt(req.params.page) || 1; // Current page number, defaulting to 1
    const limit = parseInt(req.params.limit) || 10; // Number of items to return per page, defaulting to 10
    const skip = (page - 1) * limit;

    const groups = await GroupModel.find({
      category: { $in: preferredCategories },
      $and: [
        { members: { $nin: [userId] } },
        { administrators: { $nin: [userId] } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const resultGroups = groups.map((group) => ({
      type: "group",
      data: group,
    }));

    const groupIds = groups.map((group) => group._id);

    const events = await EventModel.find({
      group: { $in: groupIds },
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const resultEvents = events.map((event) => ({
      type: "event",
      data: event,
    }));

    const shuffledResults = shuffleArray([...resultGroups, ...resultEvents]);

    res.json({ ok: true, data: shuffledResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

// Fisher-Yates shuffle algorithm
function shuffleArray(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
