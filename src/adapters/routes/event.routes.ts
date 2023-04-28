import { Router } from "express";
import { Create } from "../controllers/event/create"
import { getAllEvents } from "../controllers/event/getAllEvents"
import { Delete } from "../controllers/event/delete"
import { Update } from "../controllers/event/update"
import { getByUser } from "../controllers/event/getByUser";


const router = Router();

router.get("/", getAllEvents);
router.get('/get/:usuarioId', getByUser);
router.delete("/delete", Delete);
router.post("/register", Create);
router.put("/update", Update);

export default router;