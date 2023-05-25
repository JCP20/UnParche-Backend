import SearchUserService from "./searchUser.service";
import SearchGroupService from "../group/searchGroup.service";

export default class enrollGroupService {
    private searchU: SearchUserService;
    private searchG: SearchGroupService;

    constructor(){
        this.searchU = new SearchUserService();
        this.searchG = new SearchGroupService();
    }

    async enrollGroup(username:string, name:string){
        try{
            const user = await this.searchU.byUsername(username);
            if (!user) {
                return "Usuario no encontrado";
            }

            // Buscar el grupo por su nombre
            const group = await this.searchG.byName(name);
            console.log(user, group);

            if (!group) {
                return "Grupo no encontrado";
            }
        
            // Verificar si el usuario ya está inscrito en el grupo
            if (user.groups.includes(group._id.toString())) {
                return "El usuario ya está inscrito en el grupo";
            }

            // Agregar el grupo a la lista de grupos del usuario
            user.groups.push(group._id.toString());
            await user.save();
            //Agregar el usuario a la lista de miembros del grupo
            group.members.push(user._id.toString());
            await group.save();
            return '';
        
        }catch(error){
            console.log(error);
            throw new Error("No se pudo registrar al usuario en el grupo");
        }

    }
}