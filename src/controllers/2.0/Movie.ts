import { Request, Response } from "express";
import * as Service from '../../services/MoviesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function movieGet(req: Request, res: Response): P<any> {
  const data = await Service.movieGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function movieFestivalGet(req: Request, res: Response): P<any> {
  const data = await Service.getMovieFestival( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function movieFestivalsGet(req: Request, res: Response): P<any> {
  const data = await Service.getMovieFestivals( req.query );
  utils.writeJSON(res, data);
};
