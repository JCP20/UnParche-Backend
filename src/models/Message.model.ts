import { Schema, model } from "mongoose";
import { IMessage } from "../domain/entities/message";

const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IMessage>("Message", MessageSchema);
