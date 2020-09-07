import "reflect-metadata";
import "./env";
import { createConnection } from "typeorm";
import { createApp } from "./app";

createConnection()
  .then(async (connection) => {
    createApp();
  })
  .catch((error) => console.log("TypeORM connection error: " + error));
