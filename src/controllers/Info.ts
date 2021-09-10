import { Request, Response } from "express";
import * as utils from '../lib/misc';

export async function getInfo(req: Request, res: Response) {
    const data = {"msg": "info "};
    utils.writeJSON(res, data)
}

