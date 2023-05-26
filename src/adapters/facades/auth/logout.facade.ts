
import logoutUserService from "../../services/auth/logout.service";
export default class logoutUserFacade{
    private logoutService: logoutUserService;
    constructor(){
        this.logoutService = new logoutUserService();
    }

    async logout(refreshToken: string){
        try{
            const ans = await this.logoutService.logout(refreshToken);
            if(ans.success === true){
                return { success: true, msg: ans.msg};
            }else{
                return { success: false, msg: ans.msg};
            } 
    }catch(error){
        return { success: false, msg: error};

        }
    }
}