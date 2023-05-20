import { Router } from "express";
import { getFilteredGroupsUser } from "../controllers/search/getFilteredGroupsUser";

const router = Router();

router.post("/", getFilteredGroupsUser);

export default router;
