import { Router } from "express";
import { check } from "express-validator";
import { Delete } from "../controllers/group/delete";
import { getAllGroups } from "../controllers/group/getAllGroups";
import { getGroupByName } from "../controllers/group/getByName";
import { getGroupsfromUser } from "../controllers/group/getByUser";
import { Register } from "../controllers/group/register";
import { Update } from "../controllers/group/update";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.get("/", getAllGroups);
router.get("/:name", getGroupByName);
router.post(
    "/register"
    ,[
        // check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name", "El name es obligatorio").not().isEmpty(),
        check("category", "Las categorias son obligatorias").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("administrators", "El administrador del grupo es obligatorio").not().isEmpty(),
        validateFields,
      ],
      Register
);
router.put("/update/:id", Update);
router.delete("/delete/:id", Delete);
router.get("/your-groups/:user", getGroupsfromUser);

export default router;