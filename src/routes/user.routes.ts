import { Router } from "express";
import { getAllUsers,Register,loginUser } from "../controllers/user.controller";

const router = Router();

// get
// post
// put
// delete

router.get("/", getAllUsers);
router.post("/register", Register);
router.post("/login", loginUser);

export default router;
