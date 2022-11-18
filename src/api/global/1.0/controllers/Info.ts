import { Request, Response } from "express";
import * as service from '../services/InfoService';
import * as utils from 'lib/misc';

export async function getInfo(req: Request, res: Response) {
    const data = {"server": await service.getServerVersion( ), "db": await service.getDBVersion()};
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

