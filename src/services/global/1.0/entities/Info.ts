import * as service from '../repositories/InfoService';

export async function getInfo(query, params, session) {
    return {"server": await service.getServerVersion( )};
}

export async function getHello(query, params, session) {
    return {"msg": "hello "};
}

export async function getRoot(query, params, session) {
    return {"msg": "root "};
}

