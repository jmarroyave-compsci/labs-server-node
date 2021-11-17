import { Request, Response } from "express";
import * as Service from '../../services/StoriesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function awards(req: Request, res: Response): P<any> {
  const data = await Service.getAwards( req.query );
  utils.writeJSON(res, data);
};

export async function remakes(req: Request, res: Response): P<any> {
  const data = await Service.getMovieRemakes( req.query );
  utils.writeJSON(res, data);
};

/*
export async function history(req: Request, res: Response): P<any> {
  const data = await Service.getMovieHistory( req.query );
  utils.writeJSON(res, data);
};
*/

export async function peopleDirectors(req: Request, res: Response): P<any> {
  const data = await Service.getPeopleDirectors( req.query );
  utils.writeJSON(res, data);
};

export async function peopleProducers(req: Request, res: Response): P<any> {
  const data = await Service.getPeopleProducers( req.query );
  utils.writeJSON(res, data);
};

export async function peopleWriters(req: Request, res: Response): P<any> {
  const data = await Service.getPeopleWriters( req.query );
  utils.writeJSON(res, data);
};

export async function peopleActors(req: Request, res: Response): P<any> {
  const data = await Service.getPeopleActors( req.query );
  utils.writeJSON(res, data);
};


