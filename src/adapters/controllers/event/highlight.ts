import mongoose from "mongoose";
import EventModel from "../../../models/Event.model";
import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const highlight = async (req: Request, res: Response) => {
    const {username, eventId} = req.body;
    console.log(username,eventId);

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

        if (event.users.includes(user._id.toString())) {
            return res.status(400).json({ ok: false, msg: "El usuario ya destacó el evento" });
        }

        event.users.push(user._id.toString());
        await event.save();
        return res.json({ ok: true, msg: "Eveto correctamente destacado por el usuario" });
      
    } catch (err) {
        console.log(err);
        return res.status(400).json({ ok: false, msg: "No se pudo destacar el evento" });
    }

}
