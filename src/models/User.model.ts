import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {type: String, required: true, unique: true}
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
