import { model, Schema } from "mongoose";
import { IGroup, IPub } from "../interfaces";

const pubSchema = new Schema(
  {
    id: {type: Number, required: true, unique: true},
    pubname: {type: String, required: true, unique: true},
    content: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);

export default model<IPub>("Publication", pubSchema);
