import { model, Schema, startSession } from "mongoose";
import { IGroup } from "../domain/entities/groups";
import EventModel from "./Event.model";

const GroupSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        "Arte",
        "Deporte",
        "Religión",
        "Investigación",
        "Semillero",
        "Videojuegos",
        "Otro",
      ],
    },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
    administrators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    photo: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

GroupSchema.pre("findOneAndDelete", async function (next) {
  const session = await startSession();

  try {
    session.startTransaction();
    const groupId = this.getQuery()._id;
    await EventModel.deleteMany({ group: groupId }, { session });
    next();
  } catch (error: any) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

export default model<IGroup>("Group", GroupSchema);
