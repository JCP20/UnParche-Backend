import searchConversationService from "../../services/conversations/searchConversation.service";

export default class searchConversationFacade{
    private search: searchConversationService;

    constructor(){
        this.search = new searchConversationService();
    }

    async getByMembers(firstUserId: string, secondUserId: string){
        try{
            const ans = await this.search.byMembers(firstUserId,secondUserId);
            return {success:true, data: ans};
        }catch(error: any|Error){
            return {success:false, msg: error.msg};
        }
    }
    
    async getByUser(id: string){
        try{
            const ans = await this.search.byUser(id);
            return {success:true, data: ans};
        }catch(error: any|Error){
            return {success:false, msg: error.msg};
        }
    }
}