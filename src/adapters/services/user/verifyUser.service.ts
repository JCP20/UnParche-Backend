//Los servicios son la capa de lógica de negocio de una aplicación. 
//Manejan la lógica de la aplicación y procesan datos, es decir, interactuan con bases de datos, APIs externas, y realizan cálculos complejos.
//Están diseñados para ser reutilizados en toda la aplicación.

/**
 * Posibles servicios:
 * (Todo lo que implique verificar, modificar y eliminar en BD)
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
 * Inicialmente se hace con estructura de clases
 * luego miramos con qué formato queda mejor...
 */

//Verificación datos de usuario

import { ClientSession, Model , startSession } from "mongoose";
import { IUser } from "../../../domain/entities/users";
import UserModel from "../../../models/User.model";
import bcrypt from "bcrypt";
import JWTGenerator from "../../../helpers/jwt";
import { sendEmail } from "../../../helpers/email";
import { verificarUsuario } from "../../../helpers/emailTemplates/verifyUser";


export default class VerifyUserService {
    private user: Model<IUser>;
    constructor(){
        this.user = UserModel;
    }

    //Verificación al momento de hacer el registro
    async register(email: string, password: string, username: string){
        const session : ClientSession = await startSession();
        session.startTransaction();

        try { 
            
            const usuarioExistente: IUser |  null = await this.user.findOne({ email });
            if (usuarioExistente) {
                //Se verifica que el email no este registrado
                return 'El correo ya se encuentra registrado';
            }
            const usernameExistente: IUser | null = await this.user.findOne({ username });
            if (usernameExistente) {
                //Se verifica que el username no este registrado
                return 'Ya existe un usuario con ese nombre de usuario';
            }
            
            // Encriptar contraseña
            const salt: string = await bcrypt.genSalt(10);
            const passwordCrypt: string = await bcrypt.hash(password, salt);

            // Crear una nueva instancia del modelo de usuario y guardarla en la base de datos
            const nuevoUsuario = new this.user({
            email,
            username,
            password: passwordCrypt,
            verified: false,
            });

            await nuevoUsuario.save({ session });

            await sendEmail(
            nuevoUsuario.email,
            "[UNParche] Verifica tu correo electrónico",
            verificarUsuario(
                nuevoUsuario.username,
                `${process.env.APP_URL}/verificar/${nuevoUsuario.id}`
            )
            );

            await session.commitTransaction();
            session.endSession();

            console.log(nuevoUsuario);
            return '';

        }catch(error){
            console.error(error);
            await session.abortTransaction();
            session.endSession();
            throw new Error('Ocurrió un error en el servidor al registrar el usuario');
        }    
    }

    //Verificación para login
    async login(email: string, password: string){
        try {    
            const currentUser = await this.user.findOne({ email });
            if (!currentUser) {
                //Se verifica que el nombre de usuario exista
                throw new Error('El correo no se encuentra registrado');
            }
            if (!currentUser.verified) {
                //Se verifica que el usuario haya verificado su cuenta
                throw new Error('Debes verificar tu cuenta para poder ingresar');
            }

            const passwordMatches = bcrypt.compareSync(password, currentUser.password);

            //Se verifica que la contraseña sea correcta
            if (!passwordMatches) {
                throw new Error('La contraseña es incorrecta, vuelva a intentarlo');
            }

            // Generate JWTs
            const accessToken = await JWTGenerator.generateAccessToken({
            id: currentUser.id,
            username: currentUser.username,
            });

            const refreshToken = await JWTGenerator.generateRefreshToken({
            id: currentUser.id,
            username: currentUser.username,
            });

            currentUser.refreshToken = refreshToken;

            await currentUser.save();

            return currentUser.id, currentUser.username, accessToken;

        }catch(error){
            console.log(error);
            throw new Error('Ocurrió un error en el servidor al ingresar a la cuenta');
        }

    }
};



