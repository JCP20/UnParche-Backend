import { Model } from "mongoose";
import { IUser } from "../../../domain/entities/users";
import UserModel from "../../../models/User.model";

export default class EditUserService{
    private user: Model<IUser>;
    constructor(){
        this.user = UserModel;
    }
    async updateUser(id: string, userData: {}){
        try {
            const userUpdated = await this.user.findByIdAndUpdate(id, userData);
            return userUpdated;
          } catch (error) {
            console.log(error);
            throw new Error("Ocurrió un error al actualizar el usuario");
          }
    }
}