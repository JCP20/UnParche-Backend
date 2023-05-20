import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";
import UserModel from "../../../models/User.model";

export const getFilteredGroupsUser = async (req: Request, res: Response) => {
  const { text, is_person, is_group, categories } = req.body;

  try {
    let users: any[] = [];
    let groups: any[] = [];

    if (is_person) {
      users = await UserModel.find(
        {
          username: { $regex: text, $options: "i" },
        },
        {
          photo: 0,
        }
      );
    } else if (is_group) {
      groups = await GroupModel.find({ name: { $regex: text, $options: "i" } });
    } else {
      users = await UserModel.find(
        {
          username: { $regex: text, $options: "i" },
        },
        {
          photo: 0,
        }
      );
      groups = await GroupModel.find({ name: { $regex: text, $options: "i" } });
    }

    if (is_group && categories) {
      const decodedCategories = Buffer.from(categories.toString(), "base64")
        .toString("utf-8")
        .split(",");

      const categoryFilters = decodedCategories.map((category: any) => ({
        category: { $regex: category, $options: "i" },
      }));

      groups = await GroupModel.find({
        $and: [
          { name: { $regex: text, $options: "i" } },
          { $or: categoryFilters },
        ],
      });
    }

    res.status(200).json({ ok: true, data: { users, groups } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
