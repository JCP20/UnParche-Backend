import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";
import GroupModel from "./Group.model";
import PubModel from "./Pub.model";

const userSchema = new Schema(
  {
    id: {type: Number, required: true},
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    verified: {type: Boolean, required: true}
    // groups: {type: Array<GroupModel>},
    // publications: {type: Array<PubModel>}
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
