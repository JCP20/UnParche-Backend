import { Schema,model } from "mongoose";
import { IReport } from "../domain/entities/report";

const ReportSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        eventId: { type: Schema.Types.ObjectId, ref: "Event" },
        reason: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
export default model<IReport>("Report", ReportSchema);
