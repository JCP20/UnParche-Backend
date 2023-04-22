import { Router } from "express";
import { check } from "express-validator";
import { isValidPassword } from "../../helpers/customChecks";
import { validateFields } from "../middlewares/validate-fields";
import { loginUser } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { revalidateToken } from "../controllers/auth/revalidate";
import { validateJwt } from "../middlewares/validate-jwt";
import { verifyEmail } from "../controllers/auth/verifyEmail";
const router = Router();
router.post(
  "/register",
  [
    // check("name", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El username es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña no cumple con el estándar").custom(
      isValidPassword
    ),
    check(
      "password_confirmation",
      "La confirmación de contraseña es obligatoria"
    )
      .not()
      .isEmpty(),
    validateFields,
  ],
  register
);
router.post("/login", 
[
  check("email", "El correo es obligatorio").notEmpty(),
  check("password", "La contraseña es obligatoria").notEmpty(),
],
loginUser);
router.get("/renew", validateJwt, revalidateToken);
router.put("/verify/:id", verifyEmail);

export default router;
