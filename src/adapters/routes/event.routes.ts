import { Router } from "express";
import { Create } from "../controllers/event/create"
import { getAllEvents } from "../controllers/event/getAllEvents"
import { Delete } from "../controllers/event/delete"
import { Update } from "../controllers/event/update"
import { getByUser } from "../controllers/event/getByUser";
import { validateFields } from "../middlewares/validate-fields";
import { check, query } from "express-validator";
import { isValidDate } from "../../helpers/customChecks";

const router = Router();

router.get("/", getAllEvents);
router.get(
    "/get",
    [
        query('id_user',"El username es obligatorio").not().isEmpty().isString(),
        query('act_date',"La fecha es inválida").optional().custom(
            isValidDate
          ),
        validateFields,
    ],
    getByUser
  );
router.post(
    "/register",
    [
        check('id_group').notEmpty().withMessage('El id del evento es requerido'),
        check('title').notEmpty().withMessage('El nombre del evento es requerido'),
        check('date').notEmpty().withMessage('La fecha del evento es requerida'),
        check('date').isDate().withMessage('La fecha del evento no ess válida'),
        check('schedule').notEmpty().withMessage('El horario del evento es requerido'),
        check('description').notEmpty().withMessage('La descripción del evento es requerida'),
       validateFields,
    ],
    Create
  );
  
router.delete(
    "/delete",
    [
        check('id').notEmpty().withMessage('El id del evento es obligatorio'),
        validateFields,
    ],
    Delete
  );
  
router.put(
    "/update",
    [
        check('id_group').notEmpty().withMessage('El id del evento es requerido'),
        check('title').notEmpty().withMessage('El nombre del evento es requerido'),
        check('date').notEmpty().withMessage('La fecha del evento es requerida'),
        check('date').isDate().withMessage('La fecha del evento no ess válida'),
        check('schedule').notEmpty().withMessage('El horario del evento es requerido'),
        check('description').notEmpty().withMessage('La descripción del evento es requerida'),
        validateFields,
    ],
    Update
  );

export default router;