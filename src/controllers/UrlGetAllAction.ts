import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Url } from "../entity/Url";

export async function urlGetAllAcion(req: Request, res: Response) {
  res.send(await getManager().getRepository(Url).find());
}
