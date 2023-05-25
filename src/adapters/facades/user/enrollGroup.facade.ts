import enrollGroupService from "../../services/user/enrollGroup.service";

export default class enrollGroupFacade{

    private verifyService: enrollGroupService;

    constructor(){
        const verifyService = new enrollGroupService();
        this.verifyService = verifyService;
    }

    async enrollGroup(username: string, name: string){
        try{
            const ans:string = await this.verifyService.enrollGroup(username, name);
            if(ans === ''){
                return { success: true, msg: "Usuario inscrito correctamente en el grupo" };
            }else{
                return { success: false, msg: ans };
            } 

        }catch(error: any|Error){
            return { success: false, msg: error.message };  
        }
    }
}