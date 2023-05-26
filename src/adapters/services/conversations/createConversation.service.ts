import { Model } from "mongoose";
import { IConversation } from "../../../domain/entities/conversation";
import ConversationModel from "../../../models/Conversation.model";

export default class createConvService{
    private conv: Model<IConversation>;
    
    constructor(){
        this.conv = ConversationModel;
    }

    async create(senderId: string, receiverId: string){
        try{
            // check if conversation already exits
            const conversationExists = await this.conv.findOne({
            members: { $all: [senderId, receiverId] },
            });
        
            if (conversationExists) {
            return conversationExists;
            }
        
            const newConversation = new this.conv({
            members: [senderId, receiverId],
            });

            const savedConversation = await newConversation.save();

            return savedConversation;
        }catch(error){
            console.log(error);
            throw new Error("Internal server error");
        }
    }
}