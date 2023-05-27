/*
    This file is responsible for the routes of the group module
    /groups
*/

import { Router } from "express";
import { check } from "express-validator";
import { deleteGroup } from "../controllers/group/delete";
import { getAllGroups } from "../controllers/group/getAllGroups";
import { getGroupByName } from "../controllers/group/getByName";
import { getGroupsfromUser } from "../controllers/group/getByUser";
import { getGroupsfromAdmin } from "../controllers/group/getByAdmin";
import { getUsersFromGroup } from "../controllers/group/getUsers";
import { updateGroup } from "../controllers/group/update";
import { validateFields } from "../middlewares/validate-fields";
import { validateJwt } from "../middlewares/validate-jwt";
import { createGroup } from "../controllers/group/createGroup";
import { getGroupById } from "../controllers/group/getByID";
import { enrollMember } from "../controllers/group/addUserToGroup";
import { removeMember } from "../controllers/group/removeUserFromGroup";
import { getFYPGroups } from "../controllers/group/listGroupsByUserPreferred";

const router = Router();

router.use(validateJwt);
router.get("/", getAllGroups);
router.get("/:name", getGroupByName);
router.get("/profile/:id", getGroupById);
router.post("/", createGroup);

router.patch(
  "/update/:groupId",
  [
    check("groupId", "El id del grupo a actualizar es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  updateGroup
);

router.delete("/:id", deleteGroup);

router.get(
  "/your-groups/:id",
  [
    check(
      "id",
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

router.get(
  "/users/:groupId",
  [
    check("groupId", "El id del grupo es obligatorio").not().isEmpty(),
    validateFields,
  ],
  getUsersFromGroup
);

router.patch("/enroll", enrollMember);
router.patch("/removeMember", removeMember);

router.get("/fypGroups/:page/:limit", getFYPGroups);

export default router;
