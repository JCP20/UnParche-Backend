import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {type: String, required: true, unique: true},
    verifed: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
