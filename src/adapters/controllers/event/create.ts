import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";

export const Create = async (req: Request, res: Response) => {
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