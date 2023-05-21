import { Schema, model, startSession } from "mongoose";
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

ConversationSchema.pre("findOneAndDelete", async function (next) {
  const session = await startSession();
  try {
    session.startTransaction();
    const conversationId = this.getQuery()._id;
    await Message.deleteMany({ conversation: conversationId }, { session });
    next();
  } catch (error: any) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

ConversationSchema.pre("deleteMany", async function (next) {
  const session = await startSession();
  try {
    session.startTransaction();
    const conversationId = this.getQuery()._id;
    await Message.deleteMany({ conversation: conversationId }, { session });
    await session.commitTransaction();
    next();
  } catch (error: any) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

export default model<IConversation>("Conversation", ConversationSchema);
