import CreateEventService from "../../services/event/createEvent.service";

export default class CreateEventFacade{
    private createService: CreateEventService

    constructor(){
        this.createService = new CreateEventService();
    }

    async create(bodyEvent:any){
        try{
            const event = this.createService.create(bodyEvent);
            return {success: true, data: event};

        }catch(error){
            console.log(error);
            return {success: true, msg: "Error en la creación del evento" };
        }
    }
}