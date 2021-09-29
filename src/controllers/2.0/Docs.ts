import { Request, Response } from "express";
import { default as P }  from "bluebird";
import * as Service from '../../services/DocsService';

export async function getDocs(req: Request, res: Response): P<any> {
  const data = await Service.getDocs( { version: "2.0"} );
  res.send(data);
};

export async function getSpecs(req: Request, res: Response): P<any> {
  const data = await Service.getSpecs( { version: "2.0"} );
  res.send(data);
};