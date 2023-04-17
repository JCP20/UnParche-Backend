import { model, Schema } from "mongoose";
import { IEvent } from "../domain/entities/events";

const userSchema = new Schema(
  {
    id_group: { type: Number, required: true},
    title: { type: String, required: true},
    date: { type: Date, required: true},
    schedule: { type: String, required: true},
    description: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

export default model<IEvent>("Event", userSchema);