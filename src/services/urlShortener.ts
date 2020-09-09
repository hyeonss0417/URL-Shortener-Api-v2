import { Service, Inject } from "typedi";
import { Url } from "../entity/Url";
import { CustomError } from "../utils/CustomError";
import { generateRandomKey } from "../utils/utils";
import { Repository } from "typeorm";
import { IUrlInputDTO } from "../interfaces/IUrl";
import config from "../config";
import _ = require("lodash");

@Service()
export default class UrlShortenrService {
  constructor(
    @Inject("urlRepository") private urlRepository: Repository<Url>
  ) {}

  public async ShortenUrl(urlInputDTO: IUrlInputDTO): Promise<{ url: string }> {
    const customAccessKey = urlInputDTO.access_key;

    if (customAccessKey) {
      await this.validateAccesKey(customAccessKey);
    } else {
      urlInputDTO.access_key = await this.getRandomUniqueAccessKey();
    }

    const newUrl = await this.urlRepository.create(urlInputDTO);
    return { url: `${config.domainName}:${config.port}/${newUrl.access_key}` };
  }

  public async GetRedirectUrl(access_key: string): Promise<string> {
    const existUrl = await this.getUrlByAccessKey(access_key);
    await this.increaseAccessCount(existUrl);
    return existUrl.url;
  }

  public async GetUrlStatistics(access_key: string) {
    const url = await this.getUrlByAccessKey(access_key);
    return _.pick(url, ["url", "access_key", "access_count", "created_date"]);
  }

  public async GetAllUrls(): Promise<Url[]> {
    return await this.urlRepository.find();
  }

  private async getUrlByAccessKey(access_key: string): Promise<Url> {
    const url = await this.urlRepository.findOne({ access_key });
    if (!url) {
      throw new CustomError("NOT_FOUND", 404, "This is an invalid URL.");
    }
    return url;
  }

  private async validateAccesKey(access_key: string) {
    if (!(await this.isUniqueAccessKey(access_key))) {
      throw new CustomError(
        "DUPLICATE_KEY",
        400,
        "This access key already exists"
      );
    }
  }

  private async isUniqueAccessKey(access_key: string) {
    const existUrl = await this.urlRepository.findOne({ access_key });
    if (!existUrl) return true;
    else return false;
  }

  private async increaseAccessCount(url: Url) {
    url.access_count++;
    await this.urlRepository.save(url);
  }

  private async getRandomUniqueAccessKey() {
    const maximumTry = 10;
    for (let i = 0; i < maximumTry; i++) {
      const newKey = generateRandomKey();
      if (await this.isUniqueAccessKey(newKey)) return newKey;
    }
    throw new CustomError(
      "SERVICE_ERROR",
      500,
      "Could not generate unique access key."
    );
  }
}
