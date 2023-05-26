import searchMessagesService from "../../services/messages/searchMessages.service";

export default class searchMessagesFacade{
    private searchService: searchMessagesService;

    constructor(){
        this.searchService = new searchMessagesService();
    }

    async getByConversation(convId:string){
        try{
            const ans = this.searchService.byConversation(convId);
            return {success: true, data: ans}; 
        }catch(error: any|Error){
            return {success: false, msg: "Internal server error"}; 
        }
    }
}