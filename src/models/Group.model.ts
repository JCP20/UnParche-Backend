import { model, Schema } from "mongoose";
import { IGroup } from "../domain/entities/groups";

const groupSchema = new Schema(
    {
      category: {
        type: String,
        enum: ['Arte', 'Deporte', 'Religión','Investigación', 'Semillero', 'Videojuegos', 'Otro']
    },
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      members: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
      administrators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
      timestamps: true,
    }
  );

export default model<IGroup>("Group", groupSchema);