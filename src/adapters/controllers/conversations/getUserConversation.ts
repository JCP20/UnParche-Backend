import { Request, Response } from "express";
import Conversation from "../../../models/Conversation.model";

export const getUserConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json({ ok: true, data: conversation });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
