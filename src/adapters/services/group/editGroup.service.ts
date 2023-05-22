import { Model } from "mongoose";
import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";

export default class EditGroupService{
    private group: Model<IGroup>;
    constructor(){
        this.group = GroupModel;
    }
    async updateGroup(idGroup: string, idUser:string, category: string, name: string, description: string, members:Array<string>, administrators:Array<string>){
        try{
            const existingGroup = await GroupModel.findOne({
                $or: [{ name }],
                _id: { $ne: idGroup },
            });
            
            const categories = [
                "Arte",
                "Deporte",
                "Religión",
                "Investigación",
                "Semillero",
                "Videojuegos",
                "Otro",
            ];
            if (!categories.includes(category)) {
                return "La categoria no existe";
            }
            if (existingGroup) {
                return "El nombre ya esta registrado";
            }
            const groupUpd = await this.group.findById(idGroup);
            if (!groupUpd) {
                return "El grupo no esta registrado";
            }
            const index = groupUpd.administrators.indexOf(idUser);
            if(index === -1){
                return "El usuario no es administrador del grupo a editar";
            }
            groupUpd.category = category;
            groupUpd.name = name;
            groupUpd.description = description;
            groupUpd.members = members;
            groupUpd.administrators = administrators;
            await this.group.updateOne({"_id":idGroup}, groupUpd);
            
            return '';
        } catch (err) {
            console.log(err);
            throw new Error("Error actualizando grupo");
        }
    }
}