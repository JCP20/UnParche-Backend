import mongoose from "mongoose";

class Database {
  private uri: string;

  constructor() {
    this.uri = process.env.MONGO_URI || "";
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log("Db connected!");
    } catch (err) {
      console.log(err);
      process.exit(0);
    }
  }
}

export default Database;
