import "mocha";
import * as chai from "chai";
import { expectReponseCustomError } from "../../utils/testUtils";
import api from "./api";
import { urlSeeder, getUrlSeed } from "../Seeder/urlSeeder";

const expect = chai.expect;

const urlSeed = getUrlSeed();

const nonExistentKey = "iwejgklnbqwj";

const testStartTime = Date.now() - 1000;

describe("[Feature] URL Shortener API", () => {
  //seeder
  before("[Seeder] Url", async () => {
    await urlSeeder();
  });
  //##### Shorten URL
  context("POST /urls - Shorten URL", () => {
    it("should return 201.", function (done) {
      const testUrl = "https://www.google.co.kr/";
      api()
        .post("/urls")
        .send({ url: testUrl })
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body.url).to.be.not.undefined;
          done();
        });
    });

    it("should return 400. (Not url pattern)", function (done) {
      api()
        .post("/urls")
        .send({ url: "://www.google.co.kr/" })
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expectReponseCustomError(res, "WRONG_REQUEST", 400);
          done();
        });
    });
  });

  //##### Redirect URL
  context("GET /:access_key - Redirect URL", () => {
    it("should return 200. (Redirection)", function (done) {
      api()
        .get(`/${urlSeed.access_key}`)
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expect(res).to.have.status(200);
          // console.log(res.redirects);
          expect(res.redirects[0]).to.be.equal(urlSeed.url);
          done();
        });
    });

    it("should return 404. (Nonexistent URL)", function (done) {
      api()
        .get(`/${nonExistentKey}`)
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expectReponseCustomError(res, "NOT_FOUND", 404);
          done();
        });
    });
  });

  //#### Get URL Statistics
  context("GET /:access_key/stat - URL Statistic", () => {
    it("should return 200 (update access_count)", async function (done) {
      await api().get(`/${urlSeed.access_key}`);
      return api()
        .get(`/${urlSeed.access_key}/stat`)
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.url).to.be.equal(urlSeed.url);
          expect(new Date(res.body.created_date).getTime()).to.be.greaterThan(
            testStartTime
          );
          expect(res.body.access_key).to.be.equal(urlSeed.access_key);
          expect(res.body.access_count).to.be.equal(urlSeed.access_count + 1);
          // expect(res.body.call_logs).to.have.lengthOf(accessCount);
          // res.body.call_logs.forEach((call_date) => {
          //   expect(new Date(call_date).getTime()).to.be.greaterThan(testStartTime);
          // });
          done();
        });
    });

    it("GET /:key/stat 404 - Nonexistent URL", function (done) {
      api()
        .get(`/${nonExistentKey}/stat`)
        .end((err, res) => {
          expect(err).to.be.not.ok;
          expectReponseCustomError(res, "NOT_FOUND", 404);
          done();
        });
    });
  });
});
