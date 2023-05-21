import EditUserService from "../../services/user/editUser.service";

export default class EditUserFacade{
    private edit: EditUserService; 
    constructor(){
        this.edit = new EditUserService();
    }

    async editUser(id: string, userData: {} ){
        try {
            const userUp = await this.edit.updateUser(id,userData);
            return {success: true, data: userUp};
        } catch (error: any|Error) {
            return {success: false, msg: error.msg};
        }
    }
}