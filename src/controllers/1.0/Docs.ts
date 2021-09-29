import { Request, Response } from "express";
import { default as P }  from "bluebird";
import * as Service from '../../services/DocsService';
import * as utils from '../../lib/misc';

export async function getDocs(req: Request, res: Response): P<any> {
  console.log("docs")
  const data = await Service.getDocs( { version: "1.0"} );
  res.send(data);
};

export async function getSpecs(req: Request, res: Response): P<any> {
  console.log("specs")
  const data = await Service.getSpecs( { version: "1.0"} );
  res.set('content-type', 'text/plain');
  res.send(data);
};