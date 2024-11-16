import asyncHandler from "express-async-handler";
import User from "../model/user.model";
import { BAD_REQUEST, OK } from "../constants/http";

export const profileHandler = asyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  console.log("userID : ", req.userId);
  userExists
    ? res.status(OK).json({ userId: userExists?._id, email: userExists?.email })
    : res.status(BAD_REQUEST).json({ message: "user does not exist" });
});
