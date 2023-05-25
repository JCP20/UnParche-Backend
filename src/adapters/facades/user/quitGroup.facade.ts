import quitGroupService from "../../services/user/quitGroup.service";

export default class quitGroupFacade{

    private quitGroupService: quitGroupService;

    constructor(){
        const verifyService = new quitGroupService();
        this.quitGroupService = verifyService;
    }

    async quitGroup(username: string, name: string){
        try{
            const ans:string = await this.quitGroupService.quitGroup(username, name);
            if(ans === ''){
                return { success: true, msg: "Usuario eliminado correctamente del grupo" };
            }else{
                return { success: false, msg: ans };
            } 

        }catch(error: any|Error){
            return { success: false, msg: error.message };  
        }
    }
}