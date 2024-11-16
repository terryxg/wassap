import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[MONGODB] successfully connected to database");
  } catch (error) {
    console.log("could not connect to the database,", error);
    process.exit(1);
  }
};
