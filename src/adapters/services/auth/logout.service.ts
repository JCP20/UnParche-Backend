
import UserModel from "../../../models/User.model";

export default class logoutUserService{
    private user: typeof UserModel;
    constructor(){
        this.user = UserModel;
    }

    async logout(refreshToken: string){
        try{
            const foundUser = await this.user.findOne({ refreshToken });

            if (!foundUser) {
                return {success: false, msg: "No se encontró el usuario"}
            }

            // Delete refresh token in db
            foundUser.refreshToken = "";
            await foundUser.save();

            return {success: true, msg: "Logout exitoso"}
        }catch(err){
            console.log(err);
            return {success: false, msg: "Error en el logout"}
        }
    }

}