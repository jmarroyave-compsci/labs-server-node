import * as fs from 'fs'
import log from "config/log";
import express from "express";
import { asyncHandler } from "lib/asyncHandler";
import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "lib/docs";
import jsyaml from 'js-yaml';

const rootPath = `${__dirname}/../api`
const services = fs.readdirSync( rootPath ).sort()

export const loadREST = async function(app){
    log.info("LOADING REST ROUTES")
    const router = express.Router();

    const loadSpecs = async function ( service, version ) {
        const routesEndpointsPath = `${rootPath}/${service}/${version}/infra/rest/`
        
        if( !fs.existsSync(`${routesEndpointsPath}/index.ts`) ) {
            log.info(`     SKIPPING: SPECS FILE NOT FOUND`);
            return
        }

        const endpoints = (await import(routesEndpointsPath)).default;

        for( const endpoint of Object.keys(endpoints).sort().reverse()){
            const routeEndpoint = `/${service}/${version}/${endpoint}`.replace("//", "/")
            log.info(`     - ${routeEndpoint}`);
            router.use(routeEndpoint, asyncHandler(endpoints[endpoint], endpoint));
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
