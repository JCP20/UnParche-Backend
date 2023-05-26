import { ObjectId } from "mongoose";
import SearchGroupService from "../../services/group/searchGroup.service";

export default class GetGroups{
    private search: SearchGroupService;
    constructor(){
        this.search = new SearchGroupService();
    }

    async getAllGroups(){
        try{
            const groups = await this.search.allGroups();
            return { success: true, data: groups };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }

    async getGroupByID(id: string){
        try{
            const group = await this.search.byID(id);
            return { success: true, data: group };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }

    async getGroupsByAdmin(idAdmin: string){
        try{
            const groups = await this.search.byAdmin(idAdmin);
            return { success: true, data: groups };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }

    }

    async getGroupByName(name: string){
        try{
            const groups = await this.search.byName(name);
            return { success: true, data: groups };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }

    async getGroupsByUser(idUser: string){
        try{
            const groups = await this.search.byUser(idUser);
            return { success: true, data: groups };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }
    async getGroupsByParam(categories: string[], name: string){
        try{
            const users = await this.search.byParam(categories, name);
            return { success: true, data: users };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }
}