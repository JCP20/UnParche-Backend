import { Model } from "mongoose";
import { IEvent } from "../../../domain/entities/events";
import EventModel from "../../../models/Event.model";

export default class CreateEventService{
    private event:Model<IEvent>

    constructor(){
        this.event = EventModel;
    }

    async create(bodyEvent: any){
        const newEvent = new EventModel(bodyEvent);
        const savedEvent = await newEvent.save();
        return savedEvent;
    }
}