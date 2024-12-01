import mongoose, { Schema } from "mongoose";

export interface ContactDocument extends Document {
  name: string;
  number: number;
  userId: string | undefined;
}

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String },
    number: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Contact = mongoose.model<ContactDocument>("Contact", contactSchema);

export default Contact;
