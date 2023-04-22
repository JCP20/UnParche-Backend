import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const enrollGroup = async (req: Request, res: Response) => {
    const {username, name } = req.body;


    try {
      // Buscar el usuario por su nombre de usuario
      const user = await UserModel.findOne({ username: username });
      console.log(user);
      if (!user) {
        return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
      }
  
      // Buscar el grupo por su nombre
      const group = await GroupModel.findOne({ name: name });
      console.log(user, group);

      if (!group) {
        return res.status(404).json({ ok: false, msg: "Grupo no encontrado" });
      }
  
      // Verificar si el usuario ya está inscrito en el grupo
      if (user.groups.includes(group._id.toString())) {
        return res.status(400).json({ ok: false, msg: "El usuario ya está inscrito en el grupo" });
      }
  
      // Agregar el grupo a la lista de grupos del usuario
      user.groups.push(group._id.toString());
      await user.save();
  
      return res.json({ ok: true, msg: "Usuario inscrito correctamente en el grupo" });

    } catch (err) {
      console.log(err);
      return res.status(400).json({ ok: false, msg: "No se pudo registrar al usuario en el grupo" });
    } 

  };

  
  
  