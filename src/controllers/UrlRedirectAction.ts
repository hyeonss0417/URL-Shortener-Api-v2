import { Request, Response, NextFunction } from "express";
import {
  increaseAccessCount,
  getUrlByAccessKey,
} from "../services/Url.service";

export default async function urlRedirectAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessKey = req.params.access_key as string;

  try {
    const url = await getUrlByAccessKey(accessKey);
    await increaseAccessCount(url);
    res.redirect(302, url.url);
  } catch (err) {
    next(err);
  }
}
