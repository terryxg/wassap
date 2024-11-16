import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  first_name: string;
  last_name: string;
  links: string;
  phone_number: number;
  newsletter: boolean;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    | "_id"
    | "email"
    | "verified"
    | "createdAt"
    | "updatedAt"
    | "phone_number"
    | "first_name"
    | "last_name"
  >;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
    phone_number: { type: Number, required: true },
    newsletter: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("user", userSchema);

export default User;
