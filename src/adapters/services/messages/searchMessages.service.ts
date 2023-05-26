import { Model } from "mongoose";
import { IMessage } from "../../../domain/entities/message";
import MessageModel from "../../../models/Message.model";

export default class searchMessagesService{
    private message: Model<IMessage>;

    constructor(){
        this.message = MessageModel;
    }

    async byConversation(convId: string){
        const messages = await this.message.find({
            conversationId: convId,
          });
        return messages;
    }
}