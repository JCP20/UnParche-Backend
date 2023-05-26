import { Model, ObjectId } from "mongoose";
import { IUser } from "../../../domain/entities/users";
import UserModel from "../../../models/User.model";

export default class SearchUserService {
    private user: Model<IUser>;

    constructor(){
        this.user = UserModel;
    }

    async allUsers(){
        return await this.user.find({});
    }

    async byID(id: ObjectId|string){
        return await this.user.findOne({ id });
    }

    async byEmail(email: string){
        return await this.user.findOne({ email: email });
    }

    async byUsername(username: string){
        return await this.user.findOne({ username: username });
    }
    async byParam(username:string){
        return await UserModel.find({
        $or: [
            { username: { $regex: username, $options: "i" } },
            { email: { $regex: username, $options: "i" } }
          ]
        }); 
    }
}