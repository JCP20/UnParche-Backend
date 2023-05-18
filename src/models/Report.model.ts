import { Schema, model } from "mongoose";
import { IReport } from "../domain/entities/report";

const ReportSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default model<IReport>("Report", ReportSchema);
