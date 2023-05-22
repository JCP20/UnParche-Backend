import EditGroupService from "../../services/group/editGroup.service";

export default class EditGroupFacade{
    private edit: EditGroupService; 
    constructor(){
        this.edit = new EditGroupService();
    }

    async editGroup(idGroup: string, idUser: string, category: string, name: string, description: string, members:Array<string>, administrators:Array<string> ){
        try {
            const ans = await this.edit.updateGroup(idGroup,idUser,category, name, description, members, administrators);
            if(ans === ''){
                return {success: true, msg: "Grupo actualizado correctamente"};
            }else{
                return {success: false, msg: ans};
            }
        } catch (error: any|Error) {
            return {success: false, msg: error.msg};
        }
    }
}