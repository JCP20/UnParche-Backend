import { Model } from "mongoose";
import { IEvent } from "../../../domain/entities/events";
import EventModel from "../../../models/Event.model";

export default class EditEventService{
    private event: Model<IEvent>;

    constructor(){
        this.event = EventModel;
    }

    async editEvent(idEvent: string, bodyEvent: any){
        const actualEvent = this.event.findByIdAndUpdate(idEvent, bodyEvent);

        if (!actualEvent) {
            return {msg:"No se pudo actualizar el evento"};
        }

        return {msg: '', data: actualEvent};
    }
}