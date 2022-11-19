import * as fs from 'fs'
import log from 'common/log';
import express from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "common/docs";
import jsyaml from 'js-yaml';
import { default as P }  from "bluebird";
import * as utils from '../lib/misc';
import { Request, Response } from "express";
import { getServices, loadClass, classExists } from 'common/files'

export const loadREST = async function(app){
    log.info("LOADING REST ROUTES")
    const router = express.Router();

    const loadSpecs = async function ( service ) {
        const routesEndpointsPath = `${service.versionPath}/ports/rest/`
        log.info(routesEndpointsPath)
        if( !classExists(routesEndpointsPath) ) {
            log.info(`     SKIPPING: SPECS FILE NOT FOUND`);
            return
        }

        const endpoints = (await loadClass(routesEndpointsPath)).default

        for( const endpoint of Object.keys(endpoints).sort().reverse()){
            const routeEndpoint = `/${service.name}/${service.version}/${endpoint}`.replace("//", "/")
            log.info(`     - ${routeEndpoint}`);

            if( endpoints[endpoint] == null ) continue

            const handler = ( endpoints[endpoint]['handler'] ) ? endpoints[endpoint]['handler'] : endpoints[endpoint]
            const contentType = ( endpoints[endpoint]['contentType'] ) ? endpoints[endpoint]['contentType'] : "application/json"

            switch(contentType){
                case "application/json":
                    router.use(routeEndpoint, asyncHandler( async function( req: Request, res: Response ): P<any>{
                        const session = req?.['session'] ?? { id: 1 }
                        const data = await handler( req.query, req.params, session )
                        utils.writeJSON(res, data);
                    }, endpoint));
                    break;
                case "text/plain":
                    router.use(routeEndpoint, asyncHandler( async function( req: Request, res: Response ): P<any>{
                        const session = req?.['session'] ?? { id: 1 }
                        const data = await handler( req.query, req.params, session )
                        res.set('content-type', contentType);
                        res.send(data)
                    }, endpoint));
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

export const loadGraphQL = async function( app ){
    log.info("LOADING GRAPHQL ROUTES")
    const router = express.Router();

    const loadSpec = async function( service ) {
        const oasFile = await getSpecs( service.name, service.version );
        if(!oasFile) {
            log.info(`     SKIPPING: SPECS FILE NOT FOUND`);
            return
        }

        const oasDoc = jsyaml.safeLoad(oasFile);
        const {schema} = await createGraphQLSchema(oasDoc, { 
                simpleNames: true,
                operationIdFieldNames : true,
                headers: function(a,aa,c,x) {
                    const b = x['context']
                    return { cookie: b['headers']['cookie'] }
                },          
            }
        )

        const routeEndpoint = `/${service.name}/${service.version}/graphql`
        log.info(`     - ${routeEndpoint}`);
        router.use(routeEndpoint, graphqlHTTP( (req, res) => {
            return {
                schema, 
                context: req,
                graphiql: true, 
                pretty: true
            }
        }));
    }


    for( const service of getServices() ){
        log.info(`  SERVICE: ${service.name} v.${service.version}`);
        await loadSpec(service)
    }

    app.use('/', router);
}
