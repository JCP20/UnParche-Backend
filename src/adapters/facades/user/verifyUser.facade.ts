//Son una capa adicional que se coloca entre el controlador y el servicio.
//Su objetivo principal es ocultar la complejidad y la lógica de los servicios.

/** (Se hacen las mismas fachadas que en los servicios)
 * 
 * Verificar datos usuario
 * Verificar datos grupo
 * Verificar datos evento
 * 
 * Modificar datos usuario
 * Modificar datos grupo
 * Modificar datos evento
 * 
 * Eliminar usuario
 * Eliminar grupo
 * Eliminar evento 
 * 
 */

import { Model } from "mongoose";
import { IUser } from "../../../domain/entities/users";
import VerifyUserService from "../../services/user/verifyUser.service";

export default class VerifyUserFacade{
    private verifyService: VerifyUserService;

    constructor(verifyService: VerifyUserService){
        this.verifyService = verifyService;
    }

    async register(email: string, password: string, username: string){
        try{
            await this.verifyService.register(email, password, username);
            return { success: true };
        }catch(error){
            return { success: false, msg: error.message };
        }
    }    
    async login(email: string, password: string){
        try {
            //devuelve el id, el username y el accessToken
            await this.verifyService.login(email, password);
            return { success: true, msg: "El usuario ha ingresado con éxito a su cuenta"};
        } catch (error) {
            return { success: false, msg: error.message};
        }
    }

};
