import "reflect-metadata";
import "./env.ts";
import { createConnection } from "typeorm";
import createApp from "./app";

createConnection()
  .then(async (_connection) => {
    createApp();
  })
  .catch((error) => console.log("TypeORM connection error: " + error));
