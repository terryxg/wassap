import mongoose, { Schema } from "mongoose";

export interface BusinessDocument extends mongoose.Document {
  name: string;
  location: string;
  category: object;
  owner: object;
}

const businessSchema = new Schema<BusinessDocument>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Business = mongoose.model("Business", businessSchema);
export default Business;
