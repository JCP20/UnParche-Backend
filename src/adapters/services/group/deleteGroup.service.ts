import { Model } from "mongoose";
import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";

export default class DeleteGroupService{
    private group = Model<IGroup>;

    constructor(){
        this.group = GroupModel;
    }

    async delete(idGroup:string){
        try{
            const grupoExistente: IGroup | null = await this.group.findById(idGroup);
            if (!grupoExistente) {
                return "El grupo no existe";
            }

            // Elimina el grupo de la base de datos
            await this.group.findByIdAndDelete(idGroup);
            return '';
        } catch (error) {
            console.error(error);
            throw new Error ("Ocurrió un error en el servidor al eliminar el grupo");
        }
    }
}