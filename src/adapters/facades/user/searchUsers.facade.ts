import { ObjectId } from "mongoose";
import SearchUserService from "../../services/user/searchUser.service";

export default class GetUsers{
    private search: SearchUserService;
    constructor(){
        this.search = new SearchUserService();
    }

    async getAllUsers(){
        try{
            const users = await this.search.allUsers();
            return { success: true, data: users };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }

    async getUserByID(id: ObjectId|string){
        try{
            const user = await this.search.byID(id);
            return { success: true, data: user };
        }catch(error){
            return { success: false,  msg: "Ocurrió un error en el servidor" };
        }
    }
    async getUserByParam(username: string){
        try{
         const users = await this.search.byParam(username);
         return { success: true, data:users };
        }catch(error){
            return { success: false, msg: "Ocurrio un error en el servidor"}
        }
    }
}