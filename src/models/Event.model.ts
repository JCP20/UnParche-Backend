import { model, Schema } from "mongoose";
import { IEvent } from "../domain/entities/events";

const eventSchema = new Schema(
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

export default model<IEvent>("Event", eventSchema);
