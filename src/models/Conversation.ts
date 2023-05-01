import { Schema, model } from "mongoose";
import { IConversation } from "../domain/entities/conversation";

const ConversationSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default model<IConversation>("Conversation", ConversationSchema);
