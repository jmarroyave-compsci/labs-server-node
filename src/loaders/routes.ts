import * as fs from 'fs'
import log from "config/log";
import express from "express";
import { asyncHandler } from "lib/asyncHandler";
import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "lib/docs";
import jsyaml from 'js-yaml';
import { default as P }  from "bluebird";
import * as utils from 'lib/misc';
import { Request, Response } from "express";

const rootPath = `${__dirname}/../api`
const services = fs.readdirSync( rootPath ).sort()

export const loadREST = async function(app){
    log.info("LOADING REST ROUTES")
    const router = express.Router();

    const loadSpecs = async function ( service, version ) {
        const routesEndpointsPath = `${rootPath}/${service}/${version}/infra/rest/`
        log.info(routesEndpointsPath)
        if( !fs.existsSync(`${routesEndpointsPath}/index.ts`) && !fs.existsSync(`${routesEndpointsPath}/index.js`) ) {
            log.info(`     SKIPPING: SPECS FILE NOT FOUND`);
            return
        }

        const endpoints = (await import(routesEndpointsPath)).default;

        for( const endpoint of Object.keys(endpoints).sort().reverse()){
            const routeEndpoint = `/${service}/${version}/${endpoint}`.replace("//", "/")
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

    for( const service of services){
        log.info(`  SERVICE: ${service}`);
        const servicePath = `${rootPath}/${service}`
        const versions = fs.readdirSync( servicePath ).sort()
        for( const version of versions) {
            log.info(`    v.${version}`);
            await loadSpecs( service, version )   
        }
    }

    app.use('/', router);
}

export const loadGraphQL = async function( app ){
    log.info("LOADING GRAPHQL ROUTES")
    const router = express.Router();

    const loadSpec = async function( service, version ) {
        const oasFile = await getSpecs( service, version );
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

        const routeEndpoint = `/${service}/${version}/graphql`
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


    for( const service of services ){
        log.info(`  SERVICE: ${service}`);
        const servicePath = `${rootPath}/${service}`
        const versions = fs.readdirSync( servicePath ).sort()
        for( const version of versions) {
            log.info(`    v.${version}`);
            await loadSpec(service, version)
        }
    }

    app.use('/', router);
}
