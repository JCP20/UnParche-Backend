import { Request, Response } from "express";
import searchConversationFacade from "../../facades/conversations/searchConversation.facade";

export const getBothSidesConversation = async (req: Request, res: Response) => {

  const searchConversation = new searchConversationFacade();
  const result = await searchConversation.getByMembers(req.params.firstUserId, req.params.secondUserId);  
  
  if(result.success){  
    res.status(200).json({ ok: true, data: result.data });
  } else {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
