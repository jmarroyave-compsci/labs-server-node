import * as fs from 'fs'
import log from 'common/log';
import express from "express";
import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "common/docs";
import jsyaml from 'js-yaml';
import { getServices, loadClass, classExists } from 'common/files'

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


    for( const service of await getServices() ){
        log.info(`  SERVICE: ${service.name} v.${service.version}`);
        await loadSpec(service)
    }

    app.use('/', router);
}
