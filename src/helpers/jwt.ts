import jwt from "jsonwebtoken";

export class JWTGenerator {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public async generateToken(uid: string, name: string): Promise<string> {
    const payload = { uid, name };

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
            reject( 
              new Error("An error has occurred, please contact an admin")
            );
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