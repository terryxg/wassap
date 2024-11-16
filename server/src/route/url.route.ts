import { Router } from "express";
import { createNewUrl, redirectOnClick } from "../controller/url.controller";

const urlRoutes = Router();

urlRoutes.post("/new", createNewUrl);
urlRoutes.get("/redirect/:slug", redirectOnClick);

export default urlRoutes;
