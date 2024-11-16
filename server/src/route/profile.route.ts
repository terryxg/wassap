import { Router } from "express";
import { profileHandler } from "../controller/profile.controller";

const profileRoutes = Router();

profileRoutes.get("/", profileHandler);

export default profileRoutes;
