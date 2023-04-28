import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";
import { Request, Response } from "express";

export const getByUser = async (req: Request, res: Response) => {
    try {
      const id_user = req.params;
      
      const groups = await GroupModel.find({ members: id_user }).exec();
      const groupsName = groups.map(group => group.name);

      const events = await EventModel.find({ id_group: { $in: groupsName } })
        .populate('id_group')
        .exec();

        console.log(events);
        return res.status(200).json({ ok: true, data: events});

      // retornar todos los gruposs registrados
      
    } catch (error) {

      console.log(error);
      return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
    }
};
