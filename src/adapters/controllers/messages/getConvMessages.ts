import { Request, Response } from "express";
import Message from "../../../models/Message.model";
import searchMessagesFacade from "../../facades/messages/searchMessages.facade";

export const getConversationMessages = async (req: Request, res: Response) => {
  const search = new searchMessagesFacade();
  const result = await search.getByConversation(req.params.conversationId);
  if(result.success){
    res.status(200).json({ ok: true, data: result.data });
  } else {
    res.status(500).json({ ok: false, msg: result.msg });
  }
};
