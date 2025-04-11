import bcrypt from "bcryptjs";
import { configuration } from "../config/config";
import mongoose from "mongoose";
import { ROLE } from "../model/user.model";
import jwt from "jsonwebtoken";

export function hashedPassword(password: string) {
  const salt = bcrypt.genSaltSync(Number(configuration.SALT_ROUD));
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function jwtToken({
  payload,
  expiresIn,
}: {
  payload: { email: string; _id: mongoose.Types.ObjectId; role: ROLE };
  expiresIn: number;
}) {
  return jwt.sign(payload, configuration.JWT_TOKEN, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, configuration.JWT_TOKEN);
}
