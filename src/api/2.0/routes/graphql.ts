import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "lib/docs";
import jsyaml from 'js-yaml';

import express from "express";
const router = express.Router();

( async () => {
	const oasFile = await getSpecs( { version : "2.0"} );
	const oasDoc = jsyaml.safeLoad(oasFile);
	const {schema} = await createGraphQLSchema(oasDoc, { 
		simpleNames: true,
		operationIdFieldNames : true,
	})
	router.use('/2.0/graphql', graphqlHTTP({schema, graphiql: true, pretty: true}));
})();


export default router;
