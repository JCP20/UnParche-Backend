import { model, Schema, startSession } from "mongoose";
import { IEvent } from "../domain/entities/events";
import ReportModel from "./Report.model";

const EventSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    photo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

EventSchema.pre("findOneAndDelete", async function (next) {
  const session = await startSession();

  try {
    session.startTransaction();
    const eventId = this.getQuery()._id;
    await ReportModel.deleteMany({ event: eventId }, { session });
    next();
  } catch (error: any) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

export default model<IEvent>("Event", EventSchema);
