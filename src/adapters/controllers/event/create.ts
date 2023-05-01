import { Request, Response } from "express";
import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";

export const Create = async (req: Request, res: Response) => {
  const {id_group, title, datef, schedule, description} = req.body;
    try{
      const group = await GroupModel.findById(id_group);
      if(!group){
        return res.status(400).json({ok: false,
          message: 'el grupo ingresado no está registrado'
        });  
      }
      if(typeof(datef) == "string") {
        const partsDate = datef.split('/');
        if (partsDate.length !== 3) {
        return false; // El string de fecha no tiene el formato correcto
        }
        const day = parseInt(partsDate[0]);
        const month = parseInt(partsDate[1]) - 1; // Los meses en JS van de 0 a 11
        const year = parseInt(partsDate[2]) + 2000; // Asumimos que los años están en formato 'AA'
    
        const date = new Date(year, month, day);
        console.log(date);
      
        const nuevoEvento = new EventModel({id_group, title, date, schedule, description});
        await nuevoEvento.save();
        return res.status(200).json({ok: true, "msg":"Evento creado"});
      }
      }catch(err){
        console.log(err);
        return res.status(400).json({ok: false, "msg":"Error en la creación del evento"});
      };
  }