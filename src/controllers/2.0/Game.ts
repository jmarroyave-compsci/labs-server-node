import { Request, Response } from "express";
import * as Service from '../../services/GamesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function gameGet(req: Request, res: Response): P<any> {
  const data = await Service.getGame( { id: req.params.id  } );
  utils.writeJSON(res, data);
};