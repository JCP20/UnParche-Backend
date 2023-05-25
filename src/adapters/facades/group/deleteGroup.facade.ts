import DeleteGroupService from "../../services/group/deleteGroup.service";

export default class DeleteGroupFacade{
    private deleteService: DeleteGroupService; 

    constructor(){
        this.deleteService = new DeleteGroupService();
    }

    async delete(idGroup:string){
        try{
            const ans = await this.deleteService.delete(idGroup);
            if(ans === ''){
                return {success: true, msg: "Grupo eliminado exitosamente"};
            }else{
                return {success: false, msg: ans}
            }
        }catch(error: any|Error){
            return {success: false, msg: error.msg};
        }
    }
} 