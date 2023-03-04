import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.DB.URI || "");

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Db connected!");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
