import verifyEmailService from "../../services/auth/verifyEmail.service";

export default class verifyEmailFacade{
    private verifyService: verifyEmailService;

    constructor(){
        this.verifyService = new verifyEmailService();
    }

    async verifyEmail(id: string){
        try{
            const ans = await this.verifyService.verifyEmail(id);
            if(ans.data){
                return {success: true, msg: ans.msg,token: ans.token, data: ans.data};
            }else{
                return {success: false, msg: ans.msg};
            }
        }catch(error: any|Error){
            console.log(error);
            return {success: false, msg: error.msg};
        }
    }
}