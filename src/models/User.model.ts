import { Schema, model } from "mongoose";
import { IUser } from "../domain/entities/users";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("UserModel", userSchema);
