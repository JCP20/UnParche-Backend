import { Request, Response } from "express";
import Message from "../../../models/Message.model";

export const newMessage = async (req: Request, res: Response) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res
      .status(200)
      .json({ ok: true, msg: "Message saved", data: savedMessage });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
