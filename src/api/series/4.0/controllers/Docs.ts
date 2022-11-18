import { Request, Response } from "express";
import { default as P }  from "bluebird";
import * as docs from 'lib/docs';

export async function getDocs(req: Request, res: Response): P<any> {
  console.log("docs")
  const data = await docs.getDocs( { version: "2.0"} );
  res.send(data);
};

export async function getSpecs(req: Request, res: Response): P<any> {
  console.log("specs")
  const data = await docs.getSpecs( "series", "4.0" );
  res.set('content-type', 'text/plain');
  res.send(data);
};