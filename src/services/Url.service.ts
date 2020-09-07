import { getManager } from "typeorm";
import { Url, urlAccessKeyLength } from "../entity/Url";
import { CustomError } from "../utils/CustomError";

export async function getUrlByAccessKey(access_key: string) {
  const url = await getManager().getRepository(Url).findOne({ access_key });
  if (!url) {
    throw new CustomError("NOT_FOUND", 404, "This is an invalid URL.");
  }
  return url;
}

export async function createUrl(url: string, access_key: string) {
  const newUrl = new Url();
  newUrl.url = url;
  newUrl.access_key = access_key;
  await getManager().getRepository(Url).save(newUrl);
  return newUrl;
}

export async function increaseAccessCount(url: Url) {
  url.access_count++;
  await getManager().getRepository(Url).save(url);
}

export async function isUniqueAccessKey(access_key: string) {
  const urlRepository = getManager().getRepository(Url);
  const existUrl = await urlRepository.findOne({ access_key });
  if (!existUrl) return true;
  else return false;
}

export async function getRandomUniqueAccessKey() {
  const maximumTry = 10;
  for (let i = 0; i < maximumTry; i++) {
    const newKey = generateRandomKey();
    if (await isUniqueAccessKey(newKey)) return newKey;
  }
  throw new CustomError(
    "SERVICE_ERROR",
    500,
    "Could not generate unique access key."
  );
}

export async function validateUrlShortenInput(
  inputUrl: string,
  customAccessKey: string | undefined
) {
  if (inputUrl === undefined || !isUrlFormat(inputUrl)) {
    throw new CustomError("WRONG_REQUEST", 400, "This is not in URL format.");
  }

  if (customAccessKey !== undefined) {
    if (customAccessKey.length > urlAccessKeyLength) {
      throw new CustomError(
        "WRONG_REQUEST",
        400,
        "This custom key is too long."
      );
    }
    if (!(await isUniqueAccessKey(customAccessKey))) {
      throw new CustomError(
        "DUPLICATE_KEY",
        406,
        "This custom key already exists"
      );
    }
  }
}

export function isUrlFormat(url) {
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  return urlRegex.test(url);
}
export function generateRandomKey() {
  return Math.random().toString(36).substr(2, 10);
}
