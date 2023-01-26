import * as fs from 'fs'
import log from 'common/log';
import config from 'common/config';
import express from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { default as P }  from "bluebird";
import * as utils from '../lib/misc';
import { Request, Response, NextFunction } from "express";
import { getServices, loadClass, classExists } from 'common/files'
import { getSession } from "common/session";

export const loadREST = async function(app){
    log.info("LOADING REST ROUTES")
    const router = express.Router();

    const appendRoute = ( method, endpoint, handler) => {
        //console.log("appending route", method, endpoint)
        switch( method ){
            case "post":
                app.post(endpoint, handler)
                break
            case "get":
                app.get(endpoint, handler)
                break
            case "delete":
                app.delete(endpoint, handler)
                break
            default:
                app.all(endpoint, handler)
        }
    }

    const loadSpecs = async function ( service ) {
        const routesEndpointsPath = `${service.versionPath}/ports/rest/`
        log.info(routesEndpointsPath)
        if( !classExists(routesEndpointsPath) ) {
            log.info(`     SKIPPING: SPECS FILE NOT FOUND`);
            return
        }

        const endpoints = (await loadClass(routesEndpointsPath)).default
        if(config.LOCAL){
            updateJSONRoutes(routesEndpointsPath, endpoints)    
        }
        for( const key of Object.keys(endpoints).sort().reverse()){
            const endpoint = endpoints[key]['endpoint'] ?? key 
            const method = endpoints[key]['method'] ?? "*" 
            const handler = endpoints[key]['handler']  ?? endpoints[endpoint]
            const contentType = endpoints[key]['contentType'] ?? "application/json"
            const routeEndpoint = `/${service.name}/${service.version}/${endpoint}`.replace("//", "/")
            log.info(`     - ${routeEndpoint}`);

            if( endpoints[key] == null ) continue

            switch(contentType){
                case "application/json":
                    appendRoute(method, routeEndpoint, asyncHandler( async function( req: Request, res: Response, next: NextFunction ): P<any>{
                        const query = req.query
                        const params = { 
                            ...req.params,
                            ...req.body,
                        }

                        //log.info(`> ${routeEndpoint} [${contentType}]| qry: ${ JSON.stringify(req.query) } | params: ${JSON.stringify(req.params)} | user: ${JSON.stringify(req['user'])}`);
                        const data = await handler( query, params, getSession(req) )
                        utils.writeJSON(res, data);
                        return
                    }, endpoint));
                    break;
                case "text/plain":
                case "text/html":
                    appendRoute(method, routeEndpoint, asyncHandler( async function( req: Request, res: Response, next: NextFunction ): P<any>{
                        const query = req.query
                        const params = { 
                            ...req.params,
                            ...req.body,
                        }
                        //log.info(`> ${routeEndpoint} [${contentType}]| qry: ${ JSON.stringify(req.query) } | params: ${JSON.stringify(req.params)}`);
                        const data = await handler( query, params, getSession(req) )
                        res.set('content-type', contentType);
                        return res.send(data)
                    }, endpoint));
                    break;                
                case "handler":
                    appendRoute(method, routeEndpoint, async function( req: Request, res: Response, next: NextFunction ): P<any>{
                        const query = req.query
                        const params = { 
                            ...req.params,
                            ...req.body,
                        }
                        //log.info(`> ${routeEndpoint} [${contentType}]| qry: ${ JSON.stringify(req.query, null, 2) } | params: ${JSON.stringify(req.params, null, 2)}`);
                        const handlerResp = await handler( query, params, getSession(req) )
                        return await handlerResp(req, res, next)
                    });
                    break;                
            }
        }
    }

    for( const service of getServices()){
        log.info(`  SERVICE: ${service.name} v.${service.version}`);
        await loadSpecs( service )   
    }

    app.use('/', router);
}

function updateJSONRoutes( path, endpoints ){
    console.log("updating JSON routes")
    const data = Object.keys(endpoints).map( k => k )
    path = `${path}/routes.txt`
    if(fs.existsSync(path)) return
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
