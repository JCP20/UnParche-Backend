import SearchEventsService from "../../services/event/searchEvent.service";

export default class GetEventsFacade{
    private search: SearchEventsService;

    constructor(){
        this.search = new SearchEventsService();
    }

    async getAll(){
        try{
            const events = this.search.allEvents();
            return {success: true, data: events};
        }catch(error){
            console.log(error)
            return {success: false, msg: "Error obteniendo eventos"};
        }
    }

    async getByUser(idUser:string){
        try{
            const events = this.search.byUser(idUser);
            return {success: true, data: events};
        }catch(error){
            console.log(error)
            return {success: false, msg: "Error obteniendo eventos del usuario"};
        }
    }

    async getByGroup(idGroup:string){
        try{
            const events = this.search.byGroup(idGroup);
            return {success: true, data: events};
        }catch(error){
            console.log(error)
            return {success: false, msg: "Error obteniendo eventos del grupo"};
        }
    }
}