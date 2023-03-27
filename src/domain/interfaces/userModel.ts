import { IUser } from '../entities/users';

export interface IUserModel {
    create(user: IUser): Promise<IUser>;
    findByUsername(username: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    updateById(id: string, user: Partial<IUser>): Promise<IUser | null>;
    deleteById(id: string): Promise<IUser | null>;
  }