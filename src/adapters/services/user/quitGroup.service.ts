import SearchUserService from "./searchUser.service";
import SearchGroupService from "../group/searchGroup.service";

export default class quitGroupService {
    private searchU: SearchUserService;
    private searchG: SearchGroupService;

    constructor(){
        this.searchU = new SearchUserService();
        this.searchG = new SearchGroupService();
    }

    async quitGroup(username:string, name:string){
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
        
            // Verificar si el grupo está en la lista de grupos del usuario
            const index = user.groups.indexOf(group.id);
            if (index !== -1) {
                // quitar el grupo de los grupos del usuario

                user.groups.splice(index, 1);

                console.log(user.groups);
            } else {
                return "El usuario no esta inscrito en este grupo";
            }

            // Verificar si el usuario ya está en la lista de miembros del grupo
            const inxU = group.members.indexOf(user.id);
            if (inxU !== -1) {
                // Quitar el usuario de los miembros del grupo

                group.members.splice(inxU, 1);

                console.log(group.members);
            } else {
                return "El usuario no esta inscrito en este grupo (g)";
            }
            await user.save();
            await group.save();
            return '';
        
        }catch(error){
            console.log(error);
            throw new Error("No se pudo eliminar al usuario del grupo");
        }

    }
}