import { Request, Response } from "express";
import searchConversationFacade from "../../facades/conversations/searchConversation.facade";

export const getUserConversation = async (req: Request, res: Response) => {
  const search = new searchConversationFacade();
  const result = await search.getByUser(req.params.id);
  if(result.success) {
    res.status(200).json({ ok: true, data: result.data});
  } else {
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
