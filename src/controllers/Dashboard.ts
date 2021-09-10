import { Request, Response } from "express";
import * as Service from '../services/DashboardService';
import * as utils from '../lib/misc';
import { default as P } from "bluebird";

export async function dashboardGet(req: Request, res: Response): P<any> {
  const data = await Service.dashboardGet( {} );
  utils.writeJSON(res, data);
};
