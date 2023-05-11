import mongoose from "mongoose";
import EventModel from "../../../models/Event.model";
import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const removeHighlight = async (req: Request, res: Response) => {
    const {username, eventId} = req.body;

    try {
        const user = await UserModel.findOne({ username: username });
        console.log(user);
        if (!user) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        const current_event = new mongoose.Types.ObjectId(eventId);
        const event = await EventModel.findById(current_event);
        console.log(event);
        if (!event) {
            return res.status(404).json({ ok: false, msg: "Evento no encontrado" });
        }

        const index = event.users.indexOf(user.id);
        if (index !== -1) {
            // Remove the group from the user's groups

            event.users.splice(index, 1);

            console.log(event.users);
        } else {
            return res.status(400).json({ ok: false, msg: "El evento no está destacado por el usuario" });
        }
        await event.save();
        return res.json({ ok: true, msg: "Eveto destacado removido correctamente por el usuario" });
      
    } catch (err) {
        console.log(err);
        return res.status(400).json({ ok: false, msg: "No se pudo destacar el evento" });
    }

}
