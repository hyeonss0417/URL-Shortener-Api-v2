import "reflect-metadata";

import * as express from "express";

import Logger from "./loaders/logger";

import config from "./config";

const app = express();

export const getApp = () => app;

export async function startServer() {
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

if (process.env.NODE_ENV !== "test") {
  startServer();
}
