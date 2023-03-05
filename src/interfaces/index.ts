export interface IUser {
  id:number;
  username: string;
  email: string;
  name: string;
  password: string;
  //groups:Array<Grupo>;
  //publications:Array<Pub>; 
  createdAt: string;
  updatedAt: string;
}

export interface IGroup {
  id:number;
  username: string;
  email: string;
  name: string;
  password: string;
  //groups:Array<Grupo>;
  //publications:Array<Pub>; 
  createdAt: string;
  updatedAt: string;
}

export interface IPub {
  id:number;
  username: string;
  email: string;
  name: string;
  password: string;
  //groups:Array<Grupo>;
  //publications:Array<Pub>; 
  createdAt: string;
  updatedAt: string;
}
