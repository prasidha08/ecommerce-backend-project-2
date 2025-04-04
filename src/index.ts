import app from "../app";
import { configuration } from "./config/config";
import { mongodbConnection } from "./db/server";

mongodbConnection()
  .then(() => {
    app.listen(configuration.PORT, () => {
      console.log("Server is listening on ", configuration.PORT);
    });
  })
  .catch((e) => {
    console.log("🚀 ~ e:", e);
    console.log("🚀 ~ Error while connecting to the database:");
  });
