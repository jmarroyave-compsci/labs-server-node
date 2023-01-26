import express from "express";

import log from 'common/log';

import { loadGraphQL } from './loaders/graphql';
import { loadREST } from './loaders/rest';
import { loadDBMongo } from './loaders/db/mongo';
import { loadMiddlewares } from './loaders/middleware';

import * as notFoundRoute from './routes/not-found'
import * as reposRoute from './routes/repos'
import * as rootRoute from './routes/root'

async function create(){
  log.info("SERVER")
  log.info(" - creating server")
  const app = express();

  log.info(" - configuring databases")
  await loadDBMongo()

  log.info(" - configuring middleware")
  await loadMiddlewares(app)
    
  log.info(" - routes")
  await loadGraphQL(app)
  await loadREST(app)
  reposRoute.init( app )
  rootRoute.init( app )
  notFoundRoute.init( app )
  
  return app
}

export default create;
