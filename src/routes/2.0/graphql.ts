import { graphqlHTTP }  from 'express-graphql'
import { createGraphQLSchema } from 'openapi-to-graphql'
import jsyaml from 'js-yaml';
import * as fs from 'fs';

import express from "express";
const router = express.Router();

( async () => {
	const oasFile = fs.readFileSync(`${__dirname}/../../files/api.v.2.0.yaml`).toString();
	const oasDoc = jsyaml.safeLoad(oasFile);
	const {schema} = await createGraphQLSchema(oasDoc)
	router.use('/2.0/graphql', graphqlHTTP({schema, graphiql: true, pretty: false}));
})();


export default router;
