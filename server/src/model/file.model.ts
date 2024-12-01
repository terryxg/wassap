import mongoose, { Document, Schema, Types } from "mongoose";
import { ContactDocument } from "./contact.model";

export interface FileDocument extends Document {
  downloads: number;
  contacts: Types.ObjectId[];
}

const fileSchema = new Schema<FileDocument>(
  {
    downloads: { type: Number },
    contacts: [{ type: Types.ObjectId, ref: "Contact" }],
  },
  { timestamps: true }
);

const File = mongoose.model<FileDocument>("File", fileSchema);

export default File;
