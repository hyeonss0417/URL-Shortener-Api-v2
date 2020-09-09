import "mocha";
import * as chai from "chai";
import api from "./api";

const expect = chai.expect;

describe("[Feature] Connection", () => {
  context("Response Time", () => {
    it("returns 200 (within 1000 ms)", function (done) {
      this.timeout(1000);
      api()
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("returns 200 (within 100 ms)", function (done) {
      this.timeout(100);
      api()
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("returns 200 (within 10 ms)", function (done) {
      this.timeout(10);
      api()
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
