export interface IUser {
  id:number;
  username: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
  //groups:Array<Grupo>;
  //publications:Array<Pub>; 
  createdAt: string;
  updatedAt: string;
}
