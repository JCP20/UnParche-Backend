import { config } from "dotenv";
import express from "express";

import Database from "./config/database";
import { App } from "./app";

// Load environment variables
config();

// Create db instance
const mongoDb = new Database();

// Create app instance
const app = new App(process.env.PORT ?? "4000", mongoDb, express());

// Start server
app.start();