//Los servicios son la capa de lógica de negocio de una aplicación. 
//Manejan la lógica de la aplicación y procesan datos, es decir, interactuan con bases de datos, APIs externas, y realizan cálculos complejos.
//Están diseñados para ser reutilizados en toda la aplicación.

import { Model } from "mongoose";
import { IGroup } from "../../../domain/entities/groups";
import GroupModel from "../../../models/Group.model";
import SearchGroupService from "./searchGroup.service";

export default class RegisterGroupService {
    private group: Model<IGroup>;
    private search: SearchGroupService

    constructor(){
        this.group = GroupModel;
        this.search = new SearchGroupService();
    }

    async register(category:string, name:string, description:string, members:Array<string>, administrators: Array<string>){
        try{
            const grupoExistente: IGroup | null = await this.search.byName(name);
            if (grupoExistente) {
                return "Nombre de grupo ya registrado";
            }

            const categories = [
                "Arte",
                "Deporte",
                "Religión",
                "Investigación",
                "Semillero",
                "Videojuegos",
                "Otro",
            ];
            if (!categories.includes(category)) {
                return "La categoria no existe";
            }

            const nuevoGrupo = new this.group({
                category,
                name,
                description,
                members,
                administrators,
            });
            await nuevoGrupo.save();
            return '';

        }catch(error){
            console.log(error);
            throw new Error("Error en registro de grupo");
        }
    }
    
};



