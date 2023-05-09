import { Request, Response } from "express";
import Conversation from "../../../models/Conversation.model";

export const newConversation = async (req: Request, res: Response) => {
  // check if conversation already exits
  const conversationExists = await Conversation.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });

  if (conversationExists) {
    return res.status(200).json({ ok: true, data: conversationExists });
  }

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
