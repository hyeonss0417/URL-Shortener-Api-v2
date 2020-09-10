import { getRepository } from "typeorm";
import { Url } from "../../entity/Url";
import { AsyncForEach } from "../../utils/jsUtils";

interface UrlSeed {
  url: string;
  access_key: string;
  access_count: number;
}

export const urlSeeds: UrlSeed[] = [
  {
    url: "https://www.naver.com/",
    access_key: "1EiA912zuW",
    access_count: 49,
  },
  {
    url: "https://www.google.com/",
    access_key: "81yQ0n39Rf",
    access_count: 13,
  },
  {
    url: "https://www.youtube.com/",
    access_key: "existKey",
    access_count: 0,
  },
];

export const getRandomUrlSeed = () => {
  return urlSeeds[Math.floor(Math.random() * urlSeeds.length)];
};

export const urlSeeder = async () => {
  const urlRepository = getRepository(Url);
  await AsyncForEach(urlSeeds, async (urlSeed) => {
    const url = new Url();
    Object.assign(url, urlSeed);
    await urlRepository.save(url);
  });
};
