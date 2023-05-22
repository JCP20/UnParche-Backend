//Son una capa adicional que se coloca entre el controlador y el servicio.
//Su objetivo principal es ocultar la complejidad y la lógica de los servicios.

import AuthUserService from "../../services/user/authUser.service";

export default class AuthUserFacade{

    private verifyService: AuthUserService;

    constructor(){
        this.verifyService = new AuthUserService();
    }

    async register(email: string, password: string, username: string){
        try{
            const ans:string = await this.verifyService.register(email, password, username);
            if(ans === ''){
                return { success: true, msg: "Usuario registrado exitosamente" };
            }else{
                return { success: false, msg: ans };
            } 

        }catch(error: any|Error){
            return { success: false, msg: error.message };  
        }
    }

    async login(email: string, password: string){
        try {
            let ans: Array<string> = [];
            //devuelve el id, el username y el accessToken
            ans = await this.verifyService.login(email, password);
            if (ans.length === 1){
                return { success: false, msg: ans[0]};
            }else if (ans.length === 4){
                return { success: true, msg: "El usuario ha ingresado con éxito a su cuenta", ans: ans};
            }else{
                return { success: false, msg: "Formato no definido"};
            }
        } catch (error: any|Error) {
            return { success: false, msg: error.message};
        }
    }

};
