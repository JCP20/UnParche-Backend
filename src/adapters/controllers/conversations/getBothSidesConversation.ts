import { Request, Response } from "express";
import Conversation from "../../../models/Conversation";

export const getBothSidesConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json({ ok: true, data: conversation });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
