import deleteEventService from "../../services/event/deleteEvent.service";

export default class deleteEventFacade{
    private deleteService: deleteEventService;

    constructor(){
        this.deleteService = new deleteEventService();
    }

    async delete(idEvent:string){
        try{
            const ans = await this.deleteService.delete(idEvent);
            if(ans.msg === ''){
                return {success: true, msg: "Evento eliminado", data: ans.data};
            }else{
                return {success:false, msg: ans.msg};
            }
        }catch(error){
            console.log(error);
            return {success: false, msg: "Error en el servidor al eliminar el evento"};
        }
    }
}