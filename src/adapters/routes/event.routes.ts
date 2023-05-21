import { Router } from "express";
import { check } from "express-validator";
import { createEvent } from "../controllers/event/create";
import { deleteEvent } from "../controllers/event/delete";
import { getAllEvents } from "../controllers/event/getAllEvents";
import { getByGroup } from "../controllers/event/getByGroup";
import { getByName } from "../controllers/event/getByName";
import { getByUser } from "../controllers/event/getByUser";
import { getFYPEvents } from "../controllers/event/listEventsByUserPreferred";
import { getMyEvents } from "../controllers/event/listUserGroupEvents";
import { updateEvent } from "../controllers/event/update";
import { validateFields } from "../middlewares/validate-fields";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

router.use(validateJwt);

router.get("/:id", getByUser);

router.get(
  "/your-events/:groupId",
  [
    check("groupId", "El id del grupo es obligatorio").not().isEmpty(),
    validateFields,
  ],
  getByGroup
);

router.get(
  "/:name",
  [
    check("name", "El nombre del evento es obligatorio").not().isEmpty(),
    validateFields,
  ],
  getByName
);

router.get("/", getAllEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get("/fypEvents/:page/:limit", getFYPEvents);

router.get("/groupEvents/:page/:limit", getMyEvents);

export default router;
