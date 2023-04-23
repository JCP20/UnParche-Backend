import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";
import { check, validationResult } from "express-validator";

export const Create = async (req: Request, res: Response) => {
  const reglasValidacion = [
    check('id_group').notEmpty().withMessage('El id del evento es requerido'),
    check('title').notEmpty().withMessage('El nombre del evento es requerido'),
    check('date').notEmpty().withMessage('La fecha del evento es requerida'),
    check('date').isDate().withMessage('La fecha del evento no ess válida'),
    check('schedule').notEmpty().withMessage('El horario del evento es requerido'),
    check('description').notEmpty().withMessage('La descripción del evento es requerida')
  ];

  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, retornar una respuesta con los errores
    return res.status(400).json({ok:false , errores: errors.array() });
  }
  const {id_group, title, date, schedule, description} = req.body;
    try{
      const group = await GroupModel.findById(id_group);
      if(!group){
        return res.status(400).json({ok: false,
          message: 'el grupo ingresado no está registrado'
        });  
      }
      
      const nuevoEvento = new EventModel({id_group, title, date, schedule, description});
      await nuevoEvento.save();
      return res.status(200).json({ok: true, "msg":"Evento creado"});
      }catch(err){
        return res.status(400).json({ok: true, "msg":"Error en la creación del evento"});
      };
  }