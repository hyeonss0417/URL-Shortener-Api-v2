import "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { createTestingConnection } from "../utils/test-utils";
import { createApp } from "../app";

chai.use(chaiHttp);
const expect = chai.expect;
const app = createApp();

before(async () => await createTestingConnection());

describe("[Test] Connection", () => {
  context("Response Time", () => {
    it("returns 200 (within 1000 ms)", function (done) {
      this.timeout(1000);
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("returns 200 (within 100 ms)", function (done) {
      this.timeout(100);
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("returns 200 (within 10 ms)", function (done) {
      this.timeout(10);
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
