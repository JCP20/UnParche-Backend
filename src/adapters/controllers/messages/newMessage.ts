import { Request, Response } from "express";
import Message from "../../../models/Message.model";
import createMessageFacade from "../../facades/messages/createMessage.facade";

export const newMessage = async (req: Request, res: Response) => {
  const create = new createMessageFacade();
  const result = await create.create(req.body);
  if(result.success) {
    res
      .status(200)
      .json({ ok: true, msg: "Message saved", data: result.data });
  } else {
    res.status(500).json({ ok: false, msg: result.msg });
  }
};
