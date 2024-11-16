import { CONFLICT } from "../constants/http";
import User from "../model/user.model";
import { CreateAccount } from "../utils/types";
import appAssert from "./assert_error";
import { JWT_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";

const Register = async (data: CreateAccount) => {
  //check if user exists
  const existingUser = await User.exists({ email: data.email });
  appAssert(!existingUser, CONFLICT, "Email already in use");

  //create user
  const user = await User.create({
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    newsletter: data.newsletter,
    password: data.password,
  });
  //sign tokens
  const accessToken = jwt.sign({ id: user?._id }, JWT_SECRET, { expiresIn: "15m" });
  return {
    user: user.omitPassword(),
    accessToken,
  };
};

export default Register;
