/*
 This file is responsible for the routes of the message module
    /message
*/

import { Router } from "express";
import { newMessage } from "../controllers/messages/newMessage";
import { getConversationMessages } from "../controllers/messages/getConvMessages";

const router = Router();

router.post("/", newMessage);

router.get("/:conversationId", getConversationMessages);

export default router;
