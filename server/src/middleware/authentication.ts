import { RequestHandler } from "express";
import { payloadId } from "./passport";

const authenticate: RequestHandler = (req, res, next) => {
  req.userId = payloadId;
  next();
};
export default authenticate;
