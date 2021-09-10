import { Request, Response } from "express";
import * as utils from '../lib/misc';

export async function getHello(req: Request, res: Response) {
    const data = {"msg": "hello "};
    utils.writeJSON(res, data)
}

