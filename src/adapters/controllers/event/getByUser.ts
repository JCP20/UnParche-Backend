import EventModel from "../../../models/Event.model";
import GroupModel from "../../../models/Group.model";
import UserModel from "../../../models/User.model";
import { Request, Response } from "express";

export const getByUser = async (req: Request, res: Response) => {
  try {
    const { id_user, act_date } = req.query;

    if (id_user !== undefined && id_user !== null && id_user !== "") {
      const user = await UserModel.findOne({ username: id_user });
      if (user) {
        const groups = await GroupModel.find({ members: user?._id }).exec();
        const groupsName = groups.map((group) => group?._id);

        if(groups){
            if (act_date !== undefined && act_date !== null && act_date !== ""){
                //console.log(act_date.join())
                if(typeof(act_date) == "string") {
                    const partsDate = act_date.split('/');
                    if (partsDate.length !== 3) {
                    return false; // El string de fecha no tiene el formato correcto
                    }
                    const day = parseInt(partsDate[0]);
                    const month = parseInt(partsDate[1]) - 1; // Los meses en JS van de 0 a 11
                    const year = parseInt(partsDate[2]) + 2000; // Asumimos que los años están en formato 'AA'
                
                    const adate = new Date(year, month, day);
                    console.log(adate);
                    
                    const events = await EventModel.find({
                    $and: [{ id_group: { $in: groupsName } }, { date: adate }],
                    })
                    .populate("id_group", "name")
                    .exec();
                    const formatEvents = events.map(event => {
                        return {
                            id_group: event.id_group.name,
                            title: event.title,
                            date: event.date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }),
                            schedule: event.schedule,
                            description: event.description,
                            highlights: event.highlights
                        };
                    });
                    return res.status(200).json({ ok: true, data: formatEvents });
            
                }
            } else {
                const events = await EventModel.find({
                $and: [{ id_group: { $in: groupsName } }],
                })
                .populate("id_group", "name")
                .exec();

                const formatEvents = events.map(event => {
                    return {
                        id_group: event.id_group.name,
                        title: event.title,
                        date: event.date
                        //.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
                        ,
                        schedule: event.schedule,
                        description: event.description,
                        highlights: event.highlights
                    };
                  });
                return res.status(200).json({ ok: true, data: formatEvents });
            }
        } else {
            return res.status(400).json({ok: false, msg: "No hay grupos asociados al usuario"});
        }

      } else {
        return res.status(400).json({ok: false, msg: "No se encontró el usuario"});
      }
    } else {
        return res.status(400).json({ok: false, msg: "Por favor, proporcione los datos del usuario"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error obteniendo eventos" });
  }
};
