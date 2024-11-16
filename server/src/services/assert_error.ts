import assert from "node:assert";
import { HttpStatusCode } from "../constants/http";
import ErrorCode from "../constants/error_codes";
import AppError from "../utils/error";

type AppAssert = (
  Condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  errorCode?: ErrorCode
) => asserts Condition;

const appAssert: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAssert;
