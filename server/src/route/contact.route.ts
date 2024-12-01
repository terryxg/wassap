import { Router } from "express";
import { addToFile, downloadFile, getFiles } from "../controller/contact.controller";

const contactRouter = Router();

contactRouter.get("/get/:type", getFiles);
contactRouter.post("/add", addToFile);
contactRouter.get("/download/:fileId", downloadFile);

export default contactRouter;
