import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { Url } from "../entity/Url";
import { CustomError } from "../utils/CustomError";
import { getUrlByAccessKey } from "../services/Url.service";

export async function urlGetStatisticsAction(
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
