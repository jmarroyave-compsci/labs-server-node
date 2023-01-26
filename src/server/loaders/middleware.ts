import log from 'common/log';
import express from "express";
import { loadClass, classExists, getMiddlewares } from 'common/files'

export const loadMiddlewares = async function( app ){
    log.info("LOADING MIDDLEWARES")

    for( const middleware of getMiddlewares() ){
        log.info(` - ${middleware.name}`);
        var middlewareClass = middleware.path
        if( !classExists(middlewareClass) ) {
            middlewareClass += "/"
            if( !classExists(middlewareClass) ) {
                log.info(`     SKIPPING: FILE NOT FOUND`);
                continue
            }
        }

        const inst = (await loadClass(middlewareClass))
        inst.init(app)
    }
}
