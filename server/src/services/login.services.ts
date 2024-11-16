import { JWT_SECRET } from "../constants/env";
import { UNAUTHORIZED } from "../constants/http";
import User from "../model/user.model";
import { Login } from "../utils/types";
import appAssert from "./assert_error";
import jwt from "jsonwebtoken";

const login = async ({ email, password }: Login) => {
  //find user
  const user = await User.findOne({ email: email });
  appAssert(user, UNAUTHORIZED, "invalid email or password");

  //validate pasword
  const valid = await user.comparePassword(password);
  appAssert(valid, UNAUTHORIZED, "invalid email or password");

  //sign tokens
  const accessToken = jwt.sign({ id: user?._id }, JWT_SECRET, { expiresIn: "15m" });
  return {
    user: user.omitPassword(),
    accessToken,
  };
};
export default login;
