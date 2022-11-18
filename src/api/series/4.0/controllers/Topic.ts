import { Request, Response } from "express";
import * as Service from '../services/TopicsService';
import * as utils from 'lib/misc';
import { default as P } from "bluebird";

export async function get(req: Request, res: Response): P<any> {
  //console.log("get topics")
  const data = await Service.get( req.query );
  utils.writeJSON(res, data);
};

export async function getTopic(req: Request, res: Response): P<any> {
  //console.log("get topic")
  const data = await Service.getTopic( {topic: req.params.topic} );
  utils.writeJSON(res, data);
};
