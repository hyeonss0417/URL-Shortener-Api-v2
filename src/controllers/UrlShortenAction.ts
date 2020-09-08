import { Request, Response, NextFunction } from "express";
import {
  getRandomUniqueAccessKey,
  createUrl,
  validateUrlShortenInput,
} from "../services/Url.service";
import "../env";

export default async function urlShortenAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const inputUrl = req.body.url as string;
  const customAccessKey = req.body.key as string | undefined;

  try {
    await validateUrlShortenInput(inputUrl, customAccessKey);
    const accessKey = customAccessKey || (await getRandomUniqueAccessKey());

    const newUrl = await createUrl(inputUrl, accessKey);
    res.status(201).send({
      url: `${process.env.DOMAIN}:${process.env.PORT}/${newUrl.access_key}`,
    });
  } catch (err) {
    next(err);
  }
}
