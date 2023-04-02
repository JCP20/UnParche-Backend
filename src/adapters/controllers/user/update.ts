import UserModel from "../../../models/User.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const updateUser =async (req:Request, res: Response) => {
    try {
      const { name, email, password, username, password_confirmation } = req.body;
      // Verificar seguridadd e la contraseña
      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!regexPass.test(password)) {
        return res.status(400).json({
          ok: false,
          msg: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
        });
      }
      //verificar que las contraseñas coincidan
      if (password != password_confirmation) {
        return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
      }
      
      const salt: string = await bcrypt.genSalt(10);
      const passwordCrypt: string = await bcrypt.hash(password, salt);
  
      const datos = {name:name, username:username, password:passwordCrypt}
      UserModel.findOneAndUpdate({email: email}, datos, {new: true} )
      .then(resultado => {
        return res.status(200).json({ mensaje: "Información de usuario actualizada." });
      })
      .catch(error =>{
        if(error.code == 11000){
          return res.status(400).json({ok: false, msg: "Ya existe un usuario con ese username"});
        } else return res.status(400).json({ok: false, msg: "Error al actualizar datos de usuario."});
      });
  
    } catch (error) {
      return res.status(400).json({ok: false, msg: "Error al actualizar datos de usuario."});
    }
  }
  