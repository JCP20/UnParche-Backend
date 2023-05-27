export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
  groups: string[];
  refreshToken: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  preferredCategories: string[];
}

export interface IPayloadJWT {
  id: string;
  username: string;
}
