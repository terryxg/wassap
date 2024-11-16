import mongoose, { Document, Schema } from "mongoose";

interface Ilink extends Document {
  originalUrl: string;
  slug: string;
  clicks: number;
}

const linkSchema = new Schema<Ilink>(
  {
    originalUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          try {
            new URL(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: (props: { value: string }) => `${props.valueOf} is not a valid url`,
      },
    },
    slug: { type: String, required: true, default: () => generateSlug(), unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const generateSlug = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
};

const Url = mongoose.model<Ilink>("Url", linkSchema);
export default Url;
