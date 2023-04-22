import { Router } from "express";
import { getAllGroups } from "../controllers/group/getAllGroups";
import { Register } from "../controllers/group/register";
import { Delete} from "../controllers/group/delete";
import { Update } from "../controllers/group/update";


const router = Router();

router.get("/", getAllGroups);
router.delete("/delete", Delete);
router.post("/register", Register);
router.put("/update", Update);

export default router;
