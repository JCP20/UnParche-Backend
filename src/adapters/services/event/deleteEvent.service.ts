import { Model } from "mongoose";
import { IEvent } from "../../../domain/entities/events";
import EventModel from "../../../models/Event.model";

export default class deleteEventService{
    private event:Model<IEvent>

    constructor(){
        this.event = EventModel;
    }

    async delete(idEvent:string){
        const eventDeleted = await EventModel.findByIdAndDelete(idEvent);
        if (!eventDeleted) {
            return {msg: "No se pudo eliminar el evento"};
        }

        return {msg:'', data:eventDeleted};
    }

}