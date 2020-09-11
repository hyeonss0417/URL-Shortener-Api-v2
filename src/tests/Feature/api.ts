import { app, startServer } from "../../app";

import "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

before("Starting Server", async () => await startServer());
// after(async () => await connection.close());

export default () => chai.request(app);
