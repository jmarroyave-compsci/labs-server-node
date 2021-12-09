import { Request, Response } from "express";
import * as Service from '../../services/TopicsService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function get(req: Request, res: Response): P<any> {
  const data = await Service.get( req.query );
  utils.writeJSON(res, data);
};
