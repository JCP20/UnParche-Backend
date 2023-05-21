import jwt from "jsonwebtoken";
import { config } from "dotenv";

class JWTGenerator {
  private secretAccess: string;
  private secretRefresh: string;

  constructor() {
    this.secretAccess = process.env.SECRET_JWT_SEED_ACCESS || "";
    this.secretRefresh = process.env.SECRET_JWT_SEED_REFRESH || "";
  }

  private async generateToken(
    payload: object,
    secret: string,
    expiresIn: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        {
          expiresIn: expiresIn,
        },
        (err: Error | null, token?: string) => {
          if (err) {
            console.error(err);
            reject(new Error("An error has occurred, please contact an admin"));
          } else if (!token) {
            reject(new Error("Failed to generate token"));
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  public async generateAccessToken(payload: {
    id: string;
    username: string;
  }): Promise<string> {
    return this.generateToken(payload, this.secretAccess, "1d");
  }

  public async generateRefreshToken(payload: {
    id: string;
    username: string;
  }): Promise<string> {
    return this.generateToken(payload, this.secretRefresh, "1d");
  }
}

config();

export default new JWTGenerator();
