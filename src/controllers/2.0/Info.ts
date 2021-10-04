import { Request, Response } from "express";
import * as service from '../../services/InfoService';
import * as utils from '../../lib/misc';

export async function getAbout(req: Request, res: Response) {
  const data = await service.getAbout( );
  utils.writeJSON(res, data);
}

