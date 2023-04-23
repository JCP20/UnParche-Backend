export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
  groups: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IPayloadJWT {
  id: string;
  username: string;
}
