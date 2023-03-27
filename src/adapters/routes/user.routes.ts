import { Router } from "express";
import { check } from "express-validator";
import { isValidPassword } from "../../helpers/customChecks";
import { validateFields } from "../middlewares/validate-fields";
import { getAllUsers } from "../controllers/user/getAll";
import { register } from "../controllers/user/register";
import { loginUser } from "../controllers/user/login";
import { getUserById } from "../controllers/user/getByID";


const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
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
router.post("/login", loginUser);

export default router;
