/*
    This file is responsible for the routes of the user module
    /users
*/

import { Router } from "express";
import { getAllUsers } from "../controllers/user/getAll.controller";
import { getUserById } from "../controllers/user/getByID.controller";
import { validateJwt } from "../middlewares/validate-jwt";
import { updateUser } from "../controllers/user/updateUser";
import { enrollGroup } from "../controllers/user/enrollGroup";
import { quitGroup } from "../controllers/user/quitGroup";
import { getUserByParam } from "../controllers/user/getByParam";
import { Delete } from "../controllers/user/delete";
const router = Router();

router.get("/getbyparam", getUserByParam);
router.get("/:id", getUserById);
// Middleware to validate JWT for all next routes
router.use(validateJwt);

router.get("/", getAllUsers);

router.put("/enroll", enrollGroup);
router.put("/quit", quitGroup);
router.put("/:id", updateUser);

router.delete("/delete/:id", Delete);

export default router;
