import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import { getSpecs } from "lib/docs";
import jsyaml from 'js-yaml';

import express from "express";
const router = express.Router();

( async () => {
	const oasFile = await getSpecs( { version : "4.0"} );
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
	router.use("/4.0/graphql", graphqlHTTP( (req, res) => {
		return {
			schema, 
			context: req,
			graphiql: true, 
			pretty: true
		}
	}));
})();


export default router;
