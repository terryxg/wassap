import { RequestHandler } from "express";
import { payloadId } from "./passport";

const parseId: RequestHandler = (req, res, next) => {
  req.userId = payloadId;
  next();
};
export default parseId;
