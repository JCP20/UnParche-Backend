import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

// get
// post
// put
// delete

router.get("/pepito", getAllUsers);

export default router;
