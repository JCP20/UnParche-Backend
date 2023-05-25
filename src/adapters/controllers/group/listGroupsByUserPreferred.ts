import { Request, Response } from "express";
import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";

export const getFYPGroups = async (req: Request, res: Response) => {
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

    res.json({ ok: true, data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
