import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
// import { credentials } from "./adapters/middlewares/credentials";

// db type
import Database from "./config/database";

// routes
import authRoutes from "./adapters/routes/auth.routes";
import userRoutes from "./adapters/routes/user.routes";
import groupRoutes from "./adapters/routes/group.routes";
import conversationRoutes from "./adapters/routes/conversation.routes";
import messageRoutes from "./adapters/routes/message.routes";
import eventRoutes from "./adapters/routes/event.routes";
import reportRoutes from "./adapters/routes/report.routes";
import statisticsRoutes from "./adapters/routes/statistics.routes";
import searchRoutes from "./adapters/routes/search.routes";

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
    // this.app.use(credentials);
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ limit: "10mb", extended: false }));
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(morgan("tiny"));
    this.app.use(cookieParser());
  }

  private useRoutes(): void {
    this.app.use("/auth", authRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/groups", groupRoutes);
    this.app.use("/conversation", conversationRoutes);
    this.app.use("/message", messageRoutes);
    this.app.use("/events", eventRoutes);
    this.app.use("/reports", reportRoutes);
    this.app.use("/statistics", statisticsRoutes);
    this.app.use("/search", searchRoutes);
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
