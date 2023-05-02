import { Request, Response } from "express";
import Message from "../../../models/Message.model";

export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({ ok: true, data: messages });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
