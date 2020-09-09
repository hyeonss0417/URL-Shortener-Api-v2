import "reflect-metadata";

import * as express from "express";

import Logger from "./loaders/logger";

import config from "./config";

async function startServer() {
  const app = express();

  /**
   * Import/Export can only be used in 'top-level code'
   * At least in node 10 without babel.
   * So we are using old require.
   */
  await require("./loaders").default({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
