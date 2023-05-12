import { Schema, model } from "mongoose";
import { IUser } from "../domain/entities/users";

const userSchema = new Schema(
  {
    photo: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    refreshToken: { type: String, default: "" },
    preferredCategories: [
      {
        type: String,
        enum: [
          "Arte",
          "Deporte",
          "Religión",
          "Investigación",
          "Semillero",
          "Videojuegos",
          "Otro",
        ],
      },
    ],

    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
