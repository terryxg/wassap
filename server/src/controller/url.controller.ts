import asyncHandler from "express-async-handler";
import Url from "../model/url.model";
import { FRONTEND_URL, PORT } from "../constants/env";
import { CONFLICT, NOT_FOUND, OK } from "../constants/http";
import appAssert from "../services/assert_error";

export const createNewUrl = asyncHandler(async (req, res) => {
  const url = await Url.create({
    originalUrl: req.body.url,
  });

  const newUrl = `${FRONTEND_URL}/${url.slug}`;
  res.status(OK).json({ message: newUrl });
});

export const redirectOnClick = asyncHandler(async (req, res) => {
  const { slug } = req.params; //TODO proper slug validation

  const isValid = await Url.findOne({ slug: slug }); //verify that url exists
  appAssert(isValid, NOT_FOUND, "InvalidUrl");

  console.log(isValid.originalUrl);
  res.status(OK).json({ message: isValid.originalUrl });
});
