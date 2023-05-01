/*
 This file is responsible for the routes of the conversation module
    /conversation
*/

import { Router } from "express";
import { newConversation } from "../controllers/conversations/newConversation";
import { getUserConversation } from "../controllers/conversations/getUserConversation";
import { getBothSidesConversation } from "../controllers/conversations/getBothSidesConversation";

const router = Router();

router.post("/", newConversation);

router.get("/:id", getUserConversation);

router.get("/:firstUserId/:secondUserId", getBothSidesConversation);

export default router;
