import { Router } from "express";
import { getStatistics } from "../controllers/admin/getStatistics";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

router.use(validateJwt);

router.get("/", getStatistics);

export default router;
