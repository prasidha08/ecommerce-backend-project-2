import app from "../app";
import { configuration } from "./config/config";
import { mongodbConnection } from "./db/server";
import { createLogin } from "./seed/admin.seed";

mongodbConnection()
  .then(() => {
    console.log("Database is connected");
    
    app.listen(configuration.PORT, () => {
      console.log("Server is listening on ", configuration.PORT);
      createLogin();
    });
  })
  .catch((e) => {
    console.log("🚀 ~ e:", e);
    console.log("🚀 ~ Error while connecting to the database:",configuration.MONGODB_URL);
  });
