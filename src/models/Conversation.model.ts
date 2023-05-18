import { Schema, model } from "mongoose";
import { IConversation } from "../domain/entities/conversation";
import Message from "./Message.model";

const ConversationSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

ConversationSchema.pre("deleteOne", async function (next) {
  const conversationId = this.getQuery()._id;
  await Message.deleteMany({ conversation: conversationId });
  next();
});

export default model<IConversation>("Conversation", ConversationSchema);
