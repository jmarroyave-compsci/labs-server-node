import { Request, Response } from "express";
import * as Service from '../../services/StoriesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function podcastMusic(req: Request, res: Response): P<any> {
  const data = await Service.getMusicPodcasts( req.query );
  utils.writeJSON(res, data);
};

export async function awards(req: Request, res: Response): P<any> {
  const data = await Service.getAwards( req.query );
  utils.writeJSON(res, data);
};

export async function remakes(req: Request, res: Response): P<any> {
  const data = await Service.getRemakes( req.query );
  utils.writeJSON(res, data);
};