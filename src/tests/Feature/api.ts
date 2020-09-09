import App from "../../server";
import "../Unit/database";

import * as chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

before(async () => await App.listen());

const app = App.getApp();

export default () => chai.request(app);
