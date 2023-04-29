import { model, Schema } from "mongoose";
import { IEvent } from "../domain/entities/events";

const userSchema = new Schema(
  {
    id_group: { type: Schema.Types.ObjectId, ref: 'Group' },
    title: { type: String, required: true},
    date: { type: Date, required: true},
    schedule: { type: String, required: true},
    description: { type: String, required: true},
    highlights: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

export default model<IEvent>("EventModel", userSchema);