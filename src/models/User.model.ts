import { Schema, model, startSession } from "mongoose";
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

UserSchema.pre("findOneAndDelete", async function (next) {
  const session = await startSession();

  try {
    const userId = this.getQuery()._id;
    await ConversationModel.deleteMany({ members: userId });

    const groupsThatAdministrate = await GroupModel.find({
      administrators: userId,
    });

    for (const group of groupsThatAdministrate) {
      if (group.administrators.length === 1) {
        await GroupModel.findByIdAndDelete(group._id);
      } else {
        group.administrators = group.administrators.filter(
          (admin) => admin.toString() !== userId
        );
        await group.save();
      }
    }

    const memberOfGroups = await GroupModel.find({ members: userId });

    for (const group of memberOfGroups) {
      group.members = group.members.filter(
        (member) => member.toString() !== userId
      );
      await group.save();
    }

    next();
  } catch (error: any) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

UserSchema.pre("find", function (next) {
  this.select("-refreshToken");
  this.select("-password");
  next();
});

export default model<IUser>("User", UserSchema);
