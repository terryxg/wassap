import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { OK } from "./constants/http";
import { PORT } from "./constants/env";
import { connectToDatabase } from "./config/db";
import errorHandler from "./middleware/error.handler";
import authRoutes from "./route/auth.route";
import "./middleware/passport";
import passport from "passport";
import morgan from "morgan";
import profileRoutes from "./route/profile.route";
import authenticate from "./middleware/authentication";
import urlRoutes from "./route/url.route";

const app = express();

// add middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// health check
app.get("/health", (req, res) => {
  res.status(OK).json({ status: "Healthy" });
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/profile", passport.authenticate("jwt", { session: false }), authenticate, profileRoutes);
app.use("/url", urlRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`[SERVER] Listening on port http://localhost:${PORT}`);
  await connectToDatabase();
});
