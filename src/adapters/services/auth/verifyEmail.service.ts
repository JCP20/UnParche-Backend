import { Model } from "mongoose";
import UserModel from "../../../models/User.model";
import { IUser } from "../../../domain/entities/users";
import SearchUserService from "../user/searchUser.service";
import JWTGenerator from "../../../helpers/jwt";

export default class verifyEmailService{
    private user : Model<IUser>;
    private searchUser: SearchUserService;

    constructor(){
        this.user = UserModel; 
        this.searchUser = new SearchUserService();
    }

    async verifyEmail(id: string){
        const userUpdated = await this.user.findByIdAndUpdate(id, {
            verified: true,
          });
      
          if (userUpdated) {
            const accessToken = await JWTGenerator.generateAccessToken({
              id: userUpdated.id,
              username: userUpdated.username,
            });
      
            const refreshToken = await JWTGenerator.generateRefreshToken({
              id: userUpdated.id,
              username: userUpdated.username,
            });
      
            userUpdated.refreshToken = refreshToken;
      
            await userUpdated.save();

            return {msg: "Verificación exitosa", token: refreshToken,
              data: {
                id: userUpdated.id,
                username: userUpdated.username,
                token: accessToken,
              },
            };
          } else {
            return {msg: "User not found"};
          }
    }
}