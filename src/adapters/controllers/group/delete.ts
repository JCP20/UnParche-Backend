import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";
import { IGroup } from "../../../domain/entities/groups";

export const Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Obtén el ID del usuario a eliminar desde los parámetros de la solicitud
  
      // Verifica si existe un usuario con el ID proporcionado
      const usuarioExistente: IGroup | null = await GroupModel.findById(id);
      if (!usuarioExistente) {
        return res.status(400).json({ mensaje: 'El usuario no existe' });
      }
  
      // Elimina el usuario de la base de datos
      await GroupModel.findByIdAndDelete(id);
  
      res.status(200).json({ok: true, mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Ocurrió un error en el servidor al eliminar el usuario' });
      
    }
}