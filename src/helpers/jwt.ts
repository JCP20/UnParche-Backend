import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, username: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED as string,
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
};
