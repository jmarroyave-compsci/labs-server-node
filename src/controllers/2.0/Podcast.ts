import { Request, Response } from "express";
import * as Service from '../../services/PodcastsService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function podcastGet(req: Request, res: Response): P<any> {
  const data = await Service.podcastGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};

export async function podcastMusicGet(req: Request, res: Response): P<any> {
  const data = await Service.getPodcastsByCategory( { ...req.query, category: "music" } );
  utils.writeJSON(res, data);
};
