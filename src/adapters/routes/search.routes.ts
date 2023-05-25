import { Router } from "express";
import { getFilteredGroupsUser } from "../controllers/search/getFilteredGroupsUser";
import { getMixedData } from "../controllers/search/getFYPData";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

router.use(validateJwt);

router.post("/", getFilteredGroupsUser);

router.get("/fypData/:page/:limit", getMixedData);

export default router;
