import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";
import { IEvent } from "../../../domain/entities/events";
import { check, validationResult } from "express-validator";

export const Delete = async (req: Request, res: Response) => {
    try {
      const reglasValidacion = [
        check('id').notEmpty().withMessage('El id del evento es obligatorio'),
      ];
      // Verificar errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Si hay errores, retornar una respuesta con los errores
        return res.status(400).json({ok: false, errores: errors.array() });
      }
      const { id } = req.params; // Obtiene el ID del evento a eliminar

      // Verifica si existe un evento con el ID proporcionado
      const eventoExistente: IEvent | null = await EventModel.findById(id);
      if (!eventoExistente) {
        return res.status(400).json({ ok: false, mensaje: 'El evento no existe' });
      }
  
      // Elimina el usuario de la base de datos
      await EventModel.findByIdAndDelete(id);
  
      res.status(200).json({ok: true, mensaje: 'Evento eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Ocurrió un error en el servidor al eliminar el evento' });
      
    }
}