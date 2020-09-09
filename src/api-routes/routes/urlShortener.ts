import { Router, Request, Response, NextFunction } from "express";
import { IUrlInputDTO } from "../../interfaces/IUrl";
import Container from "typedi";
import UrlShortenrService from "../../services/urlShortener";
import validators from "../middlewares/validators";

const route = Router();

export default (app: Router) => {
  app.use(route);

  route.post(
    "/register",
    validators.shortenUrl,
    async function shortenUrlAction(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      // const logger = Container.get("logger");
      // logger.debug("Calling shortenUrl endpoint with body: %o", req.body);
      try {
        const urlShortenerServiceInstance = Container.get(UrlShortenrService);
        const shortenedUrl = await urlShortenerServiceInstance.shortenUrl(
          req.body as IUrlInputDTO
        );
        res.status(201).send(shortenedUrl);
      } catch (err) {
        next(err);
      }
    }
  );

  route.get("/:access_key", async function redirectToUrlAction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // const logger = Container.get("logger");
    // logger.debug("Calling shortenUrl endpoint with body: %o", req.body);
    const access_key = req.params.access_key as string;
    try {
      const urlShortenerServiceInstance = Container.get(UrlShortenrService);
      const { url } = await urlShortenerServiceInstance.getRedirectUrl(
        access_key
      );
      res.redirect(302, url);
    } catch (err) {
      next(err);
    }
  });

  route.get("/:access_key/stat", async function getUrlStatisticsAction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // const logger = Container.get("logger");
    // logger.debug("Calling shortenUrl endpoint with body: %o", req.body);
    const access_key = req.params.access_key as string;
    try {
      const urlShortenerServiceInstance = Container.get(UrlShortenrService);
      const urlStat = await urlShortenerServiceInstance.getUrlStatistics(
        access_key
      );
      res.status(200).send(urlStat);
    } catch (err) {
      next(err);
    }
  });

  route.get("/urls", async function getAllUrlAcion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // const logger = Container.get("logger");
    // logger.debug("Calling shortenUrl endpoint with body: %o", req.body);
    try {
      const urlShortenerServiceInstance = Container.get(UrlShortenrService);
      const urls = await urlShortenerServiceInstance.getAllUrl();
      res.status(200).send(urls);
    } catch (err) {
      next(err);
    }
  });
};
