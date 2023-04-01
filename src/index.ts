import express from "express";
import cors from "cors";
import userRoutes from "./adapters/routes/user.routes";
import groupRoutes from "./adapters/routes/group.routes"; 
import dotenv from "dotenv";

dotenv.config();

import "./config/database";

const app = express();

app.set("port", 4000);

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/group", groupRoutes);

app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en http://localhost:4000");
});
