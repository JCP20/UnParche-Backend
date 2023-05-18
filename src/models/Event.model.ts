import { model, Schema } from "mongoose";
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

EventSchema.pre("deleteOne", async function (next) {
  const eventId = this.getQuery()._id;
  await ReportModel.deleteMany({ event: eventId });
  next();
});

export default model<IEvent>("Event", EventSchema);
