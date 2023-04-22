import { config } from "dotenv";
// Load environment variables
config();
import express from "express";
import cors from "cors";
import userRoutes from "./adapters/routes/user.routes";
import authRoutes from "./adapters/routes/auth.routes";
import Database from "./config/database";
import groupsRoutes from "./adapters/routes/group.routes";

const app = express();

// Set port
app.set("port", process.env.PORT || 4000);

// Use middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/groups", groupsRoutes);

// Connect to database and start server
(async () => {
  try {
    const db = new Database();
    await db.connect();
    app
      .listen(app.get("port"), () => {
        console.log(`Server listening on http://localhost:${app.get("port")}`);
      })
      .on("error", (err) => {
        console.log("Error starting server:", err);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
})();
