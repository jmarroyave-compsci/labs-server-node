import { Request, Response } from "express";
import { default as P }  from "bluebird";
import * as Service from 'v2/services/CommentsService';
import * as utils from 'lib/misc';

export async function addComment(req: Request, res: Response): P<any> {
  const data = await Service.addComment( req.query );
  utils.writeJSON(res, data);
};