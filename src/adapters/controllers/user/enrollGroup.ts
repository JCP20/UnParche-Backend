import UserModel from "../../../models/User.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";
import { startSession } from "mongoose";

export const enrollGroup = async (req: Request, res: Response) => {
  const { username, name } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    // Buscar el usuario por su nombre de usuario
    const user = await UserModel.findOne({ username }).session(session);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    console.log(user);

    // Buscar el grupo por su nombre
    const group = await GroupModel.findOne({ name })
      .populate("members")
      .session(session);
    if (!group) {
      throw new Error("Grupo no encontrado");
    }
    console.log(user, group);

    // Verificar si el usuario ya está inscrito en el grupo
    if (user.groups.includes(group._id.toString())) {
      return res
        .status(400)
        .json({ ok: false, msg: "El usuario ya está inscrito en el grupo" });
    }

    // Agregar el grupo a la lista de grupos del usuario
    user.groups.push(group._id.toString());
    await user.save({ session });

    //Agregar el usuario a la lista de miembros del grupo
    group.members.push(user._id.toString());
    await group.save({ session });

    await session.commitTransaction();
    return res.json({
      ok: true,
      msg: "Usuario inscrito correctamente en el grupo",
    });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return res
      .status(400)
      .json({ ok: false, msg: "No se pudo registrar al usuario en el grupo" });
  } finally {
    session.endSession();
  }
};
