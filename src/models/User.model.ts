import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    verified: {type: Boolean, required: true}
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
