import { CorsOptions } from "cors";

export const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://un-parche-front.vercel.app/",
];

export const corsOptions: CorsOptions = {
  origin(origin: any, callback: any) {
    const originIsWhitelisted = allowedOrigins.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
