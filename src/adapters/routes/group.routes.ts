/*
    This file is responsible for the routes of the group module
    /groups
*/

import { Router } from "express";
import { check } from "express-validator";
import { Delete } from "../controllers/group/delete";
import { getAllGroups } from "../controllers/group/getAllGroups";
import { getGroupByName } from "../controllers/group/getByName";
import { getGroupsfromUser } from "../controllers/group/getByUser";
import { getGroupsfromAdmin } from "../controllers/group/getByAdmin";
import { Register } from "../controllers/group/register";
import { Update } from "../controllers/group/update";
import { validateFields } from "../middlewares/validate-fields";
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router();

router.use(validateJwt);
router.get("/", getAllGroups);
router.get("/:name", getGroupByName);

router.post(
  "/register",
  [
    // check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El name es obligatorio").not().isEmpty(),
    check("category", "Las categorias son obligatorias").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("administrators", "El administrador del grupo es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  Register
);

router.put(
  "/update/:groupId/:userId",
  [
    check("groupId", "El id del grupo a actualizar es obligatorio")
      .not()
      .isEmpty(),
    check("userId", "El id del usuario que va a realizar la actualización")
      .not()
      .isEmpty(),
    validateFields,
  ],
  Update
);

router.delete("/delete/:id", Delete);

router.get(
  "/your-groups/:userId",
  [
    check(
      "userId",
      "El id del usuario del que se quiere encontrar el grupo es obligatorio"
    )
      .not()
      .isEmpty(),
    validateFields,
  ],
  getGroupsfromUser
);

router.get(
  "/your-groups-admin/:userId",
  [
    check(
      "userId",
      "El id del usuario administrador del que se quiere encontrar el grupo es obligatorio"
    )
      .not()
      .isEmpty(),
    validateFields,
  ],
  getGroupsfromAdmin
);

export default router;
