import { Router } from "express";
import { createEvent } from "../controllers/event/create";
import { getAllEvents } from "../controllers/event/getAllEvents";
import { deleteEvent } from "../controllers/event/delete";
import { updateEvent } from "../controllers/event/update";
import { getByUser } from "../controllers/event/getByUser";
import { validateFields } from "../middlewares/validate-fields";
import { check, query } from "express-validator";
import { isValidDate } from "../../helpers/customChecks";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

router.use(validateJwt);

router.get("/:id", getByUser);

router.get("/", getAllEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
