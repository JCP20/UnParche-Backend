import EditEventService from "../../services/event/editEvent.service";

export default class EditEventFacade{
    private update:EditEventService

    constructor(){
        this.update = new EditEventService();
    }

    async updateEvent(idEvent: string, bodyEvent: any){
        try{
            const ans = await this.update.editEvent(idEvent,bodyEvent);
            if(ans.msg === ''){
                return {success: true, data: ans.data};
            }else{
                return {success: false, msg: ans.msg};
            }
        }catch(error: any|Error){
            console.log(error);
            return {success: false, msg: error.msg};
        }
        
    }
}