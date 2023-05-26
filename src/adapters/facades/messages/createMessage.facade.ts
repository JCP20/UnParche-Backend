import createMessageService from "../../services/messages/createMessage.service";

export default class createMessageFacade{
    private createService: createMessageService;

    constructor(){
        this.createService = new createMessageService();
    }

    async create(bodyMessage:any){
        try{
            const ans = await this.createService.create(bodyMessage);
            return { success: true, data: ans }; 
            
        }catch(error){
            return { success: false, msg: "Internal server error" };
        }
    }
}