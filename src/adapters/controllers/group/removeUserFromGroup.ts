import { Request, Response } from "express";
import GroupModel from "../../../models/Group.model";
import UserModel from "../../../models/User.model";

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { groupId, memberId } = req.body;

    // Check if the group and user exist
    const group = await GroupModel.findById(groupId);
    const user = await UserModel.findById(memberId);

    if (!group || !user) {
      return res
        .status(404)
        .json({ ok: false, message: "Group or user not found" });
    }

    // Check if the user is a member of the group
    if (!group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ ok: false, message: "User is not a member of the group" });
    }

    // Remove the user from the group's members array
    group.members = group.members.filter(
      (member) => member.toString() !== memberId
    );
    await group.save();

    return res
      .status(200)
      .json({ ok: true, message: "Member removed successfully" });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: "Failed to remove member",
      error: error.message,
    });
  }
};
