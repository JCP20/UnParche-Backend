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

export interface IGroup {
  id:number;
  groupname: string; 
  createdAt: string;
  updatedAt: string;
}

export interface IPub {
  id:number;
  pubname: string;
  content: string; 
  createdAt: string;
  updatedAt: string;
}
