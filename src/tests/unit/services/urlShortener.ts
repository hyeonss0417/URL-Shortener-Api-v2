import "mocha";
import * as chai from "chai";
import UrlShortenrService from "../../../services/urlShortener";

const expect = chai.expect;

const UrlShortener = new UrlShortenrService();

describe("[Unit] UrlShortener Service test", () => {
  describe("ShortenUrl", () => {
    UrlShortener.ShortenUrl();
  });
});

describe("[Unit] Services / Url", () => {
  //seeder
  beforeEach("[Seeder] Url", async () => {});
  context("[Func] getUrlByAccessKey", () => {
    it("should return Url.", function (done) {});

    it("should throw error (NOT_FOUND).", function (done) {});
  });
});
