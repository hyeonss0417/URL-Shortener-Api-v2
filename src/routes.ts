import { Router, Request, Response, NextFunction } from "express";
import urlGetAllAcion from "./controllers/UrlGetAllAction";
import urlShortenAction from "./controllers/UrlShortenAction";
import urlRedirectAction from "./controllers/UrlRedirectAction";
import urlGetStatisticsAction from "./controllers/UrlGetStatisticsAction";

const router = Router();

interface Route {
  path: string;
  method: "get" | "post";
  action: (req: Request, res: Response, next: NextFunction) => any;
}

const AppRoutes: Route[] = [
  {
    path: "/",
    method: "get",
    action: (req, res) => res.send("root"),
  },
  {
    path: "/error",
    method: "get",
    action: (req, res, next) => next(new Error("Test Error")),
  },
  {
    path: "/urls",
    method: "get",
    action: urlGetAllAcion,
  },
  {
    path: "/urls",
    method: "post",
    action: urlShortenAction,
  },
  {
    path: "/:access_key",
    method: "get",
    action: urlRedirectAction,
  },
  {
    path: "/:access_key/stat",
    method: "get",
    action: urlGetStatisticsAction,
  },
];

AppRoutes.forEach((route) => {
  router[route.method](route.path, route.action);
});

export default router;
