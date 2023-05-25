import RegisterGroupService from "../../services/group/registerGroup.service";

export default class RegisterGroupFacade{
    private regService: RegisterGroupService
    
    constructor(){
        this.regService = new RegisterGroupService();
    }
    
    async register(category:string, name:string, description:string, members:Array<string>, administrators: Array<string>){
        try {
            const ans:string = await this.regService.register(category, name, description, members, administrators);
            if(ans === ''){
                return { success: true, msg: "Grupo registrado exitosamente" };
            }else{
                return { success: false, msg: ans };
            }
        } catch (error: any|Error) {
            return { success: false, msg: error.message }; 
        }
    }
};
