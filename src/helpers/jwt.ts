import jwt from "jsonwebtoken";

class JWTGenerator {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public async generateToken(id: string, username: string): Promise<string> {
    const payload = { id, username };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.secret,
        {
          expiresIn: "1d",
        },
        (err: Error | null, token?: string) => {
          if (err) {
            console.error(err);
            reject(new Error("An error has occurred, please contact an admin"));
          } else if (!token) {
            reject(new Error("Failed to generate JWT"));
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export default new JWTGenerator(process.env.SECRET_JWT_SEED as string);
