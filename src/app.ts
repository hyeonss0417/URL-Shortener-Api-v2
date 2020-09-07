import * as express from "express";

import bodyParser = require("body-parser");
import router from "./routes";
import { errorHandler } from "./utils/CustomMiddleware";

const PORT = process.env.PORT || 3000;

export function createApp() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", router);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Express server listening on localhost:${PORT}`);
  });
  return app;
}
