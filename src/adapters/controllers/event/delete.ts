import EventModel from "../../../models/Event.model";
import { Request, Response } from "express";
import { IEvent } from "../../../domain/entities/events";

export const Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Obtiene el ID del evento a eliminar

      // Verifica si existe un evento con el ID proporcionado
      const eventoExistente: IEvent | null = await EventModel.findById(id);
      if (!eventoExistente) {
        return res.status(400).json({ mensaje: 'El evento no existe' });
      }
  
      // Elimina el usuario de la base de datos
      await EventModel.findByIdAndDelete(id);
  
      res.status(200).json({ok: true, mensaje: 'Evento eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Ocurrió un error en el servidor al eliminar el evento' });
      
    }
}