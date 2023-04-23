import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const Update = async (req: Request, res: Response) => {
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
    return res.status(400).json({ ok:false, errores: errors.array() });
  }  
  
  const {id_group, title, date, schedule, description} = req.body;
    const eventId = req.params.id;
    try {
      const eventoExistente = await EventModel.findOne({
        $or: [{ title }],
        _id: { $ne: eventId },
      });
      //validaciones, mas adelante se haran con express validator
      
      if (eventoExistente) {
        return res.status(400).json({ok:false,
          message: 'El título del evento ya está registrado',
        });  
      }
      const evento = await EventModel.findById(eventId);
      if(!evento){
        return res.status(400).json({ok: false,
          message: 'el evento no esta registrado'
        });  
      }
      evento.id_group = id_group;
      evento.title = title;
      evento.date = date;
      evento.schedule = schedule;
      evento.description = description;
      await evento.save();
      return res.status(200).json({ok: true,
        message: 'Evento actualizado'
      })
    }catch(err){
      console.log(err);
      res.status(400).json({ok: false, message:"Error actualizando el evento"});
    }
  }