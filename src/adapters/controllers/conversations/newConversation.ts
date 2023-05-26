import { Request, Response } from "express";
import createConvFacade from "../../facades/conversations/createConversation.facade";

export const newConversation = async (req: Request, res: Response) => {
  
  const create = new createConvFacade();
  const result = await create.create(req.body.senderId, req.body.receiverId)
  if(result.success){
    res.status(200).json({ ok: true, data: result.data });
  } else {
    res.status(500).json({ ok: false, msg: result.msg });
  }
};
