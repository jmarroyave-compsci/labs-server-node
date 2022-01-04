import { Request, Response } from "express";
import * as Service from 'v1/services/DashboardService';
import * as utils from 'lib/misc';
import { default as P } from "bluebird";

export async function dashboardGet(req: Request, res: Response): P<any> {
  const data = await Service.getDashboardToVersion( { version: "1.0"} );
  utils.writeJSON(res, data);
};
