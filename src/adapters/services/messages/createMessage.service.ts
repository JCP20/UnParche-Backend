import { Model } from "mongoose";
import { IMessage } from "../../../domain/entities/message";
import MessageModel from "../../../models/Message.model";

export default class createMessageService{
    private message: Model<IMessage>;

    constructor(){
        this.message = MessageModel;
    }

    async create(bodyMessage:any){
        const newMessage = new this.message(bodyMessage);
        const savedMessage = await newMessage.save();
        return savedMessage;
    }
}