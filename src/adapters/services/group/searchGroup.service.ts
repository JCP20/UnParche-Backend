import mongoose, { Model, ObjectId } from "mongoose";
import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";

export default class SearchGroupService {
    private group: Model<IGroup>;

    constructor(){
        this.group = GroupModel;
    }
	async byParam(categories: string[], name: string){
        if (categories.length === 0) {
            return await this.group.find({
                name: { $regex: name, $options: "i" }
            });
        }
        return await this.group.find({
            name: { $regex: name, $options: "i" },
            category: { $in: categories }
        });

    }
    async allGroups(){
        return await this.group.find({});
    }

    async byID(id:string){
        return await this.group.findOne({ id });
    }

    async byAdmin(idAdmin: string){
        const current_admin = new  mongoose.Types.ObjectId(idAdmin);
        return await this.group.find({ administrators: current_admin });
    }

    async byName(name: string){
        return await this.group.findOne({ name: name });
    }

    async byUser(idUser: string){
        const current_user = new  mongoose.Types.ObjectId(idUser);
        return await this.group.find({ members: current_user });
    }

}