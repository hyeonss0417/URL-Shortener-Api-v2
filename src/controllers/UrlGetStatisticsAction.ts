import { Request, Response, NextFunction } from "express";
import { getUrlByAccessKey } from "../services/Url.service";

export default async function urlGetStatisticsAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessKey = req.params.access_key as string;

  try {
    const existUrl = await getUrlByAccessKey(accessKey);
    const { url, access_count, created_date } = existUrl;
    res.send({ url, access_count, created_date });
  } catch (err) {
    next(err);
  }
}
