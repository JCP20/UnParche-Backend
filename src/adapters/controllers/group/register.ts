import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";
import { IGroup } from "../../../domain/entities/groups";

export const Register = async (req: Request, res: Response) => {
    const {category, name, description, members, administrators} = req.body;
    //verificaciones, despues se haran con express validator
    try{
      if(!category || !name || !description || !members || !administrators) {
        return res.status(400).json({ ok: false, msg: "Por favor, proporcione todos los datos requeridos"});
      }
      const grupoExistente: IGroup | null = await GroupModel.findOne({ name });
        if (grupoExistente){
          return res.status(400).json({ok: false, msg: "Nombre dr grupo ya registrado"})
        }
        const categories = ['Arte', 'Deporte', 'Religion','Investigacion', 'Semillero', 'Videojuegos', 'Otro'];
        if (!categories.includes(category)){
          return res.status(400).json({ok: false, msg: "La categoria no existe"})
        }
      const nuevoGrupo = new GroupModel({category, name, description, members, administrators});
      await nuevoGrupo.save();
      return res.status(200).json({ok: true, "msg":"grupo registrado"});
      }catch(err){
        return res.status(400).json({ok: true, "msg":"Error en registro de grupo"});
      };
  }