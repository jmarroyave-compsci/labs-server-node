import { Request, Response } from "express";
import * as Service from '../../services/TVService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function tvGet(req: Request, res: Response): P<any> {
  const data = await Service.getTV( { id: req.params.id  } );
  utils.writeJSON(res, data);
};