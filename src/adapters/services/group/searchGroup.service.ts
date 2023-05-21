import { Model, ObjectId } from "mongoose";
import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";

export default class SearchGroupService {
    private group: Model<IGroup>;

    constructor(){
        this.group = GroupModel;
    }

    async allGroups(){
        return await this.group.find({});
    }

    async byID(id:string){
        return await this.group.findOne({ id });
    }

    async byAdmin(idAdmin: ObjectId){
        return await this.group.find({ administrators: idAdmin });
    }

    async byName(name: string){
        return await this.group.findOne({ name: name });
    }

    async byUser(idUser: ObjectId){
        return await this.group.find({ members: idUser });
    }

}