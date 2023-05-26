import { Model } from "mongoose";
import { IConversation } from "../../../domain/entities/conversation";
import ConversationModel from "../../../models/Conversation.model";

export default class searchConversationService{
    private conv: Model<IConversation>;

    constructor(){
        this.conv = ConversationModel;
    }

    async byMembers(firstUserId: string, secondUserId: string){
        const conversation = await this.conv.findOne({
            members: { $all: [firstUserId, secondUserId] },
          });
          return conversation;
    }

    async byUser(id:string){
        const conversation = await this.conv.find({
            members: { $in: [id] },
          });
        return conversation;  
    }
}