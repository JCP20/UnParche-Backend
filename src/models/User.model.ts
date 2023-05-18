import { Schema, model } from "mongoose";
import { IUser } from "../domain/entities/users";
import ConversationModel from "./Conversation.model";
import GroupModel from "./Group.model";

const UserSchema = new Schema(
  {
    photo: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    refreshToken: { type: String, default: "" },
    preferredCategories: {
      type: [
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
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

UserSchema.pre("deleteOne", async function (next) {
  const userId = this.getQuery()._id;
  await ConversationModel.deleteMany({ members: userId });

  const groups = await GroupModel.find({ administrators: userId });

  for (const group of groups) {
    if (group.administrators.length === 1) {
      await group.deleteOne();
    } else {
      group.administrators = group.administrators.filter(
        (admin) => admin.toString() !== userId
      );
      await group.save();
    }
  }

  next();
});

export default model<IUser>("User", UserSchema);
