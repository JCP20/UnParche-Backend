export interface IUser {
  id: number;
  username: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPayloadJWT {
  id: string;
  name: string;
}
