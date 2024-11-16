import mongoose, { Schema } from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: string;
}

const categorySchema = new Schema<CategoryDocument>({
  name: { type: String, require: true, minLength: 3 },
});

const Category = mongoose.model("Category", categorySchema);
