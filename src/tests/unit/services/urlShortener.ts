import "mocha";
import * as chai from "chai";
import UrlShortenrService from "../../../services/urlShortener";
import "../database";

import { getRepository } from "typeorm";
import { Url } from "../../../entity/Url";
import { isUrlFormat } from "../../../utils/utils";

const expect = chai.expect;

describe("[Unit] UrlShortener Service test", () => {
  context("ShortenUrl", () => {
    it("should return shortened URL.", async function () {
      const urlShortenerService = new UrlShortenrService(getRepository(Url));
      const { url } = await urlShortenerService.ShortenUrl({
        url: "https://www.naver.com",
      });
      expect(url).to.be.not.undefined;
      expect(isUrlFormat(url)).to.be.true;
    });

    it("should return Error.", async function () {
      const urlShortenerService = new UrlShortenrService(getRepository(Url));

      const err = await urlShortenerService
        .ShortenUrl({
          url: "https://www.naver.com",
          access_key: "duplicate_key",
        })
        .catch((e) => e);

      expect(err).to.be.an("error");
    });
  });
});
