import mongoose from "mongoose";
import { configuration } from "../config/config";

export function mongodbConnection() {
  return mongoose.connect(configuration.MONGODB_URL);
}
