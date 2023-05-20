/*
    This file is responsible for the routes of the user module
    /users
*/

import { Router } from "express";
import { getAllUsers } from "../controllers/user/getAll";
import { getUserById } from "../controllers/user/getByID";
import { validateJwt } from "../middlewares/validate-jwt";
import { updateUser } from "../controllers/user/updateUser";

import { quitGroup } from "../controllers/user/quitGroup";
import { deleteUser } from "../controllers/user/deleteUser";
const router = Router();

router.get("/:id", getUserById);

// Middleware to validate JWT for all next routes
router.use(validateJwt);
router.get("/", getAllUsers);

router.put("/quit", quitGroup);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
