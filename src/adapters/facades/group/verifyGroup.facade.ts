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
import { IGroup } from "../../../domain/entities/groups";

export default class VerifyGroupFacade{
    
};
