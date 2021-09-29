import { Request, Response } from "express";
import * as Service from '../../services/PeopleService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function personGet(req: Request, res: Response): P<any> {
  const data = await Service.personGet( { id: req.params.id  } );
  utils.writeJSON(res, data);
};