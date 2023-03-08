export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayloadJWT {
  uid: string;
  name: string;
}
