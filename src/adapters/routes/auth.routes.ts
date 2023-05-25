/* 
    This file is responsible for the routes of the authentication module
    /auth
*/

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { loginUser } from "../controllers/auth/login.controller";
import { register } from "../controllers/auth/register.controller";
import { revalidateToken } from "../controllers/auth/renew.controller";
import { verifyEmail } from "../controllers/auth/verifyEmail.controller";
import { isValidEmail } from "../../helpers/customChecks";
import { logoutUser } from "../controllers/auth/logout.controller";

const router = Router();
router.post(
  "/register",
  [
    check("username", "El username es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    // check("email", "El email no es institucional").custom(isValidEmail),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  register
);

router.post(
  "/login",
  [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get("/logout", logoutUser);
router.put("/verify/:id", verifyEmail);
router.get("/renew", revalidateToken);

export default router;
