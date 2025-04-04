import bcrypt from "bcryptjs";
import { configuration } from "../config/config";

export function hashedPassword(password: string) {
  const salt = bcrypt.genSaltSync(Number(configuration.SALT_ROUD));
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
