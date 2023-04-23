import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";

// db type
import Database from "./config/database";

// routes
import authRoutes from "./adapters/routes/auth.routes";
import userRoutes from "./adapters/routes/user.routes";
import groupRoutes from "./adapters/routes/group.routes";

export class App {
  private readonly app: Express;
  private readonly port: string;
  private readonly db: Database;

  constructor(port: string, db: Database, app: Express) {
    this.port = port;
    this.app = app;
    this.db = db;
  }

  private useMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  private useRoutes(): void {
    this.app.use("/auth", authRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/groups", groupRoutes);
  }

  public async start(): Promise<void> {
    try {
      await this.db.connect();
      this.useMiddlewares();
      this.useRoutes();
      this.app.listen(this.port, () => {
        console.log(`Server listening on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  }
}
