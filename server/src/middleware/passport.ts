import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../model/user.model";
import cookieExtractor from "../utils/cookie";
import { Request } from "express";
import { JWT_SECRET } from "../constants/env";
import { ObjectId } from "mongoose";

const opts = {
  jwtFromRequest: (req: Request) => cookieExtractor(req), // ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export let payloadId: string;

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = User.findById(payload.id);
      payloadId = payload.id;
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
