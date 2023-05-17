import { Router } from "express";
import { createEvent } from "../controllers/event/create";
import { getAllEvents } from "../controllers/event/getAllEvents";
import { deleteEvent } from "../controllers/event/delete";
import { updateEvent } from "../controllers/event/update";
import { getByGroup } from "../controllers/event/getByGroup";
import { getByName } from "../controllers/event/getByName";
import { getByUser } from "../controllers/event/getByUser";
import { validateFields } from "../middlewares/validate-fields";
import { check, query } from "express-validator";
import { isValidDate } from "../../helpers/customChecks";
import { validateJwt } from "../middlewares/validate-jwt";
import { highlight } from "../controllers/event/highlight";
import { removeHighlight } from "../controllers/event/removeHighlight";

const router = Router();

router.use(validateJwt);

router.get("/:id", getByUser);

router.get(
    "/your-events/:groupId",
    [
        check(
            "groupId", "El id del grupo es obligatorio"
        )
            .not()
            .isEmpty(),
        validateFields,
    ],
    getByGroup
);

router.get(
    "/byName/:name",
    [
        check(
            "name", "El nombre del evento es obligatorio"
        )
            .not()
            .isEmpty(),
        validateFields,
    ],
    getByName
);

router.get("/", getAllEvents);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.put("/highlight", highlight);

router.put("/removeHighlight", removeHighlight);

router.put("/:id", updateEvent);

export default router;
