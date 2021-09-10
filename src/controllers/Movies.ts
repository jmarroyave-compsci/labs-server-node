import { Request, Response } from "express";
import { default as P }  from "bluebird";
import * as Service from '../services/MoviesService';
import * as utils from '../lib/misc';

export async function moviesGet(req: Request, res: Response): P<any> {
  const params = utils.getParams(req);
  const data = await Service.moviesGet(params);
  utils.writeJSON(res, data);
};