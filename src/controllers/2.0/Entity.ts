import { Request, Response } from "express";
import * as Service from '../../services/EntitiesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function movieGet(req: Request, res: Response): P<any> {
  console.log(req.params)
  const data = await Service.entityGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function tvShowGet(req: Request, res: Response): P<any> {
  const data = await Service.entityGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function videoGameGet(req: Request, res: Response): P<any> {
  const data = await Service.entityGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function moviesGet(req: Request, res: Response): P<any> {
  const data = await Service.entitiesGet( req.query, "movie" );
  utils.writeJSON(res, data);
};

export async function tvShowsGet(req: Request, res: Response): P<any> {
  const data = await Service.entitiesGet( req.query, "tvShow" );
  utils.writeJSON(res, data);
};

export async function videoGamesGet(req: Request, res: Response): P<any> {
  const data = await Service.entitiesGet( req.query, "videoGame" );
  utils.writeJSON(res, data);
};

