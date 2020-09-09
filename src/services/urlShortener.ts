import { Service } from "typedi";
import { Url } from "../entity/Url";
import { CustomError } from "../utils/CustomError";
import { generateRandomKey } from "../utils/utils";
import { getManager } from "typeorm";
import { IUrlInputDTO } from "../interfaces/IUrl";
import config from "../config";

@Service()
export default class UrlShortenrService {
  constructor() {}

  public async shortenUrl(urlInputDTO: IUrlInputDTO): Promise<{ url: string }> {
    const customAccessKey = urlInputDTO.access_key;

    if (customAccessKey) {
      this.validateAccesKey(customAccessKey);
    } else {
      urlInputDTO.access_key = await this.getRandomUniqueAccessKey();
    }

    const newUrl = await getManager().getRepository(Url).create(urlInputDTO);
    return { url: `${config.domainName}:${config.port}/${newUrl.access_key}` };
  }

  public async getRedirectUrl(access_key: string): Promise<{ url: string }> {
    const url = await this.getUrlByAccessKey(access_key);
    await this.increaseAccessCount(url);
    return;
  }

  public async getUrlStatistics(access_key: string) {
    const url = await this.getUrlByAccessKey(access_key);
    return _.pick(url, ["url", "access_key", "access_count", "created_date"]);
  }

  public async getAllUrl(): Promise<Url[]> {
    return await getManager().getRepository(Url).find();
  }

  private async getUrlByAccessKey(access_key: string): Promise<Url> {
    const url = await getManager().getRepository(Url).findOne({ access_key });
    if (!url) {
      throw new CustomError("NOT_FOUND", 404, "This is an invalid URL.");
    }
    return url;
  }

  private async validateAccesKey(access_key: string) {
    if (!(await this.isUniqueAccessKey(access_key))) {
      throw new CustomError(
        "DUPLICATE_KEY",
        406,
        "This access key already exists"
      );
    }
  }

  private async isUniqueAccessKey(access_key: string) {
    const existUrl = await getManager()
      .getRepository(Url)
      .findOne({ access_key });
    if (!existUrl) return true;
    else return false;
  }

  private async increaseAccessCount(url: Url) {
    url.access_count++;
    await getManager().getRepository(Url).save(url);
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
