import { app, startServer } from "../app";

import "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import dbConnection from "../loaders/database";

chai.use(chaiHttp);

before("Starting Server", async () => await startServer());
afterEach("DB Clear", async () => {
  await dbConnection.clear();
});
after(async () => await dbConnection.close());

const api = () => chai.request(app);
export default api;
