import "mocha";
import * as chai from "chai";
import "./database";
import { getUrlByAccessKey } from "../../services/urlShortener";
import { urlSeeder, getUrlSeed } from "../Seeder/urlSeeder";
import "../../utils/jsUtils";
import { Url } from "../../entity/Url";
import { expectCustomError } from "../../utils/testUtils";
import dbConnection from "../../dbConnnection";

const expect = chai.expect;

describe("[Unit] Services / Url", () => {
  //seeder
  beforeEach("[Seeder] Url", async () => {
    await dbConnection.clear();
    await urlSeeder();
  });
  context("[Func] getUrlByAccessKey", () => {
    it("should return Url.", function (done) {
      const urlSeed = getUrlSeed();
      getUrlByAccessKey(urlSeed.access_key).then((existUrl) => {
        expect(existUrl).to.be.instanceOf(Url);
        expect(existUrl.url).to.equal(urlSeed.url);
        done();
      });
    });

    it("should throw error (NOT_FOUND).", function (done) {
      getUrlByAccessKey("nonexistentKey").catch((err) => {
        expectCustomError(err, "NOT_FOUND", 404);
        done();
      });
    });
  });
});

// getUrlByAccessKey
// createUrl
// increaseAccessCount
// isUniqueAccessKey
// getRandomUniqueAccessKey
// validateUrlShortenInput
// isUrlFormat
// generateRandomKey
