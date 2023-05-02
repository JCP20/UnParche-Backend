import { Request, Response } from "express";
import Conversation from "../../../models/Conversation.model";

export const newConversation = async (req: Request, res: Response) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json({ ok: true, data: savedConversation });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
