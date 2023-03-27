import { Schema, model } from "mongoose";
import { IUser } from "../domain/entities/users";
import { IUserModel } from "../domain/interfaces/UserModel";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel: IUserModel = {
  async create(user: IUser): Promise<IUser> {
    const createdUser = await User.create(user);
    return createdUser.toObject() as IUser;
  },
  async findByUsername(username: string): Promise<IUser | null> {
    const user = await User.findOne({ username }).lean().exec();
    return user as IUser | null;
  },
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).lean().exec();
    return user as IUser | null;
  },
  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id).lean().exec();
    return user as IUser | null;
  },
  async updateById(id: string, user: Partial<IUser>): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).lean().exec();
    return updatedUser as IUser | null;
  },
  async deleteById(id: string): Promise<IUser | null> {
    const deletedUser = await User.findByIdAndDelete(id).lean().exec();
    return deletedUser as IUser | null;
  },
};

const User = model<IUser>("User", userSchema);

export { User, userModel };