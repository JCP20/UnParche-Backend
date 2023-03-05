import { model, Schema } from "mongoose";
import { IGroup } from "../interfaces";

const groupSchema = new Schema(
  {
    id: {type: Number, required: true},
    groupname: {type: String, required: true, unique: true}
  },
  {
    timestamps: true,
  }
);

export default model<IGroup>("Group", groupSchema);