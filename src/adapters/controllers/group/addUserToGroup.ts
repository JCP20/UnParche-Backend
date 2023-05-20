import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";
import UserModel from "../../../models/User.model";

export const enrollMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { groupId, memberId } = req.body;

    // Check if the group and user exist
    const group = await GroupModel.findById(groupId);
    const user = await UserModel.findById(memberId);

    if (!group || !user) {
      res.status(404).json({ message: "Group or user not found" });
      return;
    }

    // Check if the user is already a member of the group
    if (group.members.includes(memberId)) {
      res
        .status(400)
        .json({ message: "User is already a member of the group" });
      return;
    }

    // Add the user to the group's members array
    group.members.push(memberId);
    await group.save();

    res.status(200).json({ ok: true, message: "Member enrolled successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to enroll member", error: error.message });
  }
};
