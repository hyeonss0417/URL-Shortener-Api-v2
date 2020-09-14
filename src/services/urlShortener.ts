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
    const customAccessKey = urlInputDTO.accessKey;

    if (customAccessKey) {
      await this._validateAccesKey(customAccessKey);
    } else {
      urlInputDTO.accessKey = await this._getRandomUniqueAccessKey();
    }

    const newUrl = await this.urlRepository.create(urlInputDTO);
    return { url: `${config.urlRoot}/${newUrl.accessKey}` };
  }

  public async GetRedirectUrl(accessKey: string): Promise<string> {
    const existUrl = await this._getUrlByAccessKey(accessKey);
    await this._increaseAccessCountById(existUrl.id);
    return existUrl.url;
  }

  public async GetUrlStatistics(accessKey: string) {
    const url = await this._getUrlByAccessKey(accessKey);
    return _.pick(url, ["url", "accessKey", "accessCount", "createDate"]);
  }

  public async GetAllUrls(): Promise<Url[]> {
    return await this.urlRepository.find();
  }

  private async _getUrlByAccessKey(accessKey: string): Promise<Url> {
    const url = await this.urlRepository.findOne({ accessKey });
    if (!url) {
      throw new CustomError("NOT_FOUND", 404, "This is an invalid URL.");
    }
    return url;
  }

  private async _validateAccesKey(accessKey: string) {
    if (!(await this._isUniqueAccessKey(accessKey))) {
      throw new CustomError(
        "DUPLICATE_KEY",
        400,
        "This access key already exists"
      );
    }
  }

  private async _isUniqueAccessKey(accessKey: string): Promise<boolean> {
    const existUrl = await this.urlRepository.findOne({ accessKey });
    if (!existUrl) return true;
    else return false;
  }

  private async _increaseAccessCountById(id: number) {
    await this.urlRepository.increment({ id }, "accessCount", 1);
  }

  private async _getRandomUniqueAccessKey(): Promise<string> {
    const newKey = generateRandomKey();
    if (await this._isUniqueAccessKey(newKey)) return newKey;
    else {
      throw new CustomError(
        "SERVICE_ERROR",
        500,
        "Failed to generate arbitrary unique access key. Please try again"
      );
    }
  }
}
