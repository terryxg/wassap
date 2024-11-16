import asyncHandler from "express-async-handler";
import { loginSchema, registerSchema } from "../utils/schema";
import Register from "../services/register.services";
import login from "../services/login.services";
import { CREATED, OK } from "../constants/http";

export const registerHandler = asyncHandler(async (req, res) => {
  //validate request

  const request = registerSchema.parse({
    ...req.body,
  });

  //call service
  const { user, accessToken } = await Register(request);

  res.status(CREATED).cookie("accessToken", accessToken).json(user);
});

export const loginHandler = asyncHandler(async (req, res, next) => {
  //validate request
  const request = loginSchema.parse({
    ...req.body,
  });

  //call service
  const { user, accessToken } = await login(request);
  res.status(OK).cookie("accessToken", accessToken).json(user);
});
