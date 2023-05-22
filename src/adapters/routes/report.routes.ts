/* 
    Routes for reports:
*/

import { Router } from "express";
import { createReport } from "../controllers/report/createReport";
import { deleteReport } from "../controllers/report/deleteReport";
import { getAllReports } from "../controllers/report/getAllReports";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import { validateJwt } from "../middlewares/validate-jwt";
import { getReportsByUser } from "../controllers/report/getReportsByUser";
import { getReportsByEvent } from "../controllers/report/getReportsByEvent";
import { deleteReportsByEvent } from "../controllers/report/deleteEventReports";

const router = Router();

router.use(validateJwt);

router.get(
  "/:userId",
  [
    check("userId", "El id del usuario es obligatorio").not().isEmpty(),
    validateFields,
  ],
  getReportsByUser
);

router.get(
  "/:eventId",
  [
    check("eventId", "El id del evento es obligatorio").not().isEmpty(),
    validateFields,
  ],
  getReportsByEvent
);

router.get("/", getAllReports);

router.post("/", createReport);

router.delete("/:id", deleteReport);

router.delete("/by-event/:eventId", deleteReportsByEvent);

export default router;
