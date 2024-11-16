import { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/error";
import z, { ZodError } from "zod";
import { BAD_REQUEST } from "../constants/http";
import { Error } from "mongoose";

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue: any) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleMongooseError = (res: Response, error: Error.ValidationError) => {
  for (const field in error.errors) {
    const errorDetail = error.errors[field];

    return res.status(BAD_REQUEST).json({
      message: errorDetail.message,
    });
  }
};

const errorHandler: ErrorRequestHandler = (error, req, res: Response, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof AppError) {
    handleAppError(res, error);
  }

  if (error instanceof ZodError) {
    handleZodError(res, error);
  }

  if (error instanceof Error.ValidationError) {
    //mongoose validation error
    handleMongooseError(res, error);
  }
};

export default errorHandler;
