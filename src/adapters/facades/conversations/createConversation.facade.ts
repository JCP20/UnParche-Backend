import { error } from "console";
import createConvService from "../../services/conversations/createConversation.service";

export default class createConvFacade{
    private createService: createConvService

    constructor(){
        this.createService = new createConvService();
    }

    async create(senderId: string, receiverId:string){
        try{   
            const ans = await this.createService.create(senderId,receiverId);
            return {success:true, data: ans};
        }catch(error: any|Error){
            console.log(error);
            return {success:false, msg: error.msg};
        }
    }
}