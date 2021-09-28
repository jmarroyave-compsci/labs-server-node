import { Request, Response } from "express";
import * as Service from '../../services/StoriesService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function podcastMusic(req: Request, res: Response): P<any> {
  const data = await Service.getMusicPodcasts( {} );
  utils.writeJSON(res, data);
};

export async function movieAwards(req: Request, res: Response): P<any> {
  const data = await Service.getMovieAwards( {} );
  utils.writeJSON(res, data);
};

