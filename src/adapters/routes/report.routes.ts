import { Router } from "express";
import { create } from "../controllers/report/create";
import { deleteReport } from "../controllers/report/delete";
import { getAllReports } from "../controllers/report/getAllReports";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import { validateJwt } from "../middlewares/validate-jwt";
import { getByUser } from "../controllers/report/getByUser";
import { getByEvent } from "../controllers/report/getByEvent";

const router = Router();

router.use(validateJwt);

router.get(
    "/:userId",
    [
        check(
            "userId", "El id del usuario es obligatorio"
        )
            .not()
            .isEmpty(),
        validateFields,
    ],
    getByUser
);

router.get(
    "/:eventId",
    [
        check(
            "eventId", "El id del evento es obligatorio"
        )
            .not()
            .isEmpty(),
        validateFields,
    ],
    getByEvent
);

router.get("/", getAllReports);

router.post("/", create);

router.delete("/:id", deleteReport);

export default router;