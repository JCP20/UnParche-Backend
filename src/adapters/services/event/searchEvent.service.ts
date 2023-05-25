import { Model } from "mongoose";
import { IEvent } from "../../../domain/entities/events";
import EventModel from "../../../models/Event.model";

export default class SearchEventsService{
    private event: Model<IEvent>

    constructor(){
        this.event = EventModel;
    }

    async allEvents(){
        return await this.event.find({});
    }

    async byUser(idUser:string){
        return await this.event.find({users: idUser});
    }

    async byGroup(idGroup:string){
        return await this.event.find({group: idGroup});
    }

}