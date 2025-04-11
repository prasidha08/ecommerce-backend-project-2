type ConfigurationType = {
  PORT: number | string;
  MONGODB_URL: string;
  SALT_ROUD: string | number;
  HASH_PASSWORD: string;
  JWT_TOKEN: string;
};

import dotenv from "dotenv";

dotenv.configDotenv();

export const configuration: ConfigurationType = {
  PORT: process.env.PORT ?? 8080,
  MONGODB_URL: process.env.MONGODB_URL ?? "",
  SALT_ROUD: process.env.SALT_ROUD ?? 9,
  HASH_PASSWORD: process.env.HASH_PASSWORD ?? "",
  JWT_TOKEN: process.env.JWT_TOKEN ?? "",
};
