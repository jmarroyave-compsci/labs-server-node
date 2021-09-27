import { Request, Response } from "express";
import * as utils from '../lib/misc';

export async function getInfo(req: Request, res: Response) {
    const data = {"msg": "info "};
    utils.writeJSON(res, data)
}

export async function getHello(req: Request, res: Response) {
    const data = {"msg": "hello "};
    utils.writeJSON(res, data)
}

export async function getRoot(req: Request, res: Response) {
    const data = {"msg": "root "};
    utils.writeJSON(res, data)
}

