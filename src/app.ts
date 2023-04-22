import { config } from "dotenv";
// Load environment variables
config();
import express from "express";
import cors from "cors";
import userRoutes from "./adapters/routes/user.routes";
import authRoutes from "./adapters/routes/auth.routes";
import Database from "./config/database";
import groupsRoutes from "./adapters/routes/group.routes";

export default class App {
  private readonly app: express.Application;
  private readonly port: number;

  constructor(port: string | number) {
    this.app = express();
    this.port = typeof port === "string" ? +port : port;
    this.configure();
  }

  private configure(): void {
    // Use middlewares
    this.app.use(cors());
    this.app.use(express.json());

    // Routes
    this.app.use("/auth", authRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/groups", groupsRoutes);
  }

  public async start(): Promise<void> {
    try {
      const db = new Database();
      await db.connect();
      this.app.listen(this.port, () => {
        console.log(`Server listening on http://localhost:${this.port}`);
      }).on("error", (err) => {
        console.log("Error starting server:", err);
        process.exit(1);
      });
    } catch (error) {
      console.error("Error connecting to database:", error);
      process.exit(1);
    }
  }
}