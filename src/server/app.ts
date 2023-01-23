import express from "express";
import { Express, Request, Response, NextFunction, Send } from 'express';

import bodyParser from 'body-parser';
import log from 'common/log';
import config from 'common/config'
import { fileSearchReplace, getResourcePath } from 'common/files';
import serveIndex from 'serve-index';
import { loadGraphQL } from './loaders/graphql';
import { loadREST } from './loaders/rest';
import { loadDBMongo } from './loaders/db/mongo';

import * as hostingProviderMiddleware from './middleware/hosting-provider'
import * as requestIDMiddleware from './middleware/req-id'
import * as debugMiddleware from './middleware/debug'
import * as errorMiddleware from './middleware/error'
import * as cacheMiddleware from './middleware/cache'
import * as guestbookMiddleware from './middleware/guestbook'
import * as historyMiddleware from './middleware/history'
import * as sessionMiddleware from './middleware/session'
import * as authMiddleware from './middleware/auth'
import * as notFoundMiddleware from './middleware/not-found'
import * as corsMiddleware from './middleware/cors'
import * as testingMiddleware from './middleware/testing'
import * as loggerMiddleware from './middleware/logger'

async function create(){
  log.info("SERVER")
  log.info(" - creating server")
  const app = express();

  debugMiddleware.init( app )

  log.info(" - configuring databases")
  await loadDBMongo()

  log.info(" - configuring middleware")

  corsMiddleware.init( app )
  
  app.use(bodyParser.json({
    strict: false
  }));

  hostingProviderMiddleware.init( app )
  loggerMiddleware.init( app )
  sessionMiddleware.init( app )
  authMiddleware.init( app )

  requestIDMiddleware.init( app )
  testingMiddleware.init( app )
  cacheMiddleware.init( app )
  guestbookMiddleware.init( app )
  historyMiddleware.init( app )
  
  
  log.info(" - routes")
  log.info(`loading routes:`);
  await loadGraphQL(app)
  await loadREST(app)

  log.info(" - /repos")
  app.use('/repos', express.static( getResourcePath("repos") ), serveIndex(__dirname + '/files/repos'));

  log.info(" - /")

  app.all('/', function (req, res) {
      console.log("ROUTE", "catching /")
      const file = getResourcePath("docs/index.html");
      const index = fileSearchReplace(file, "__VERSION__", config.VERSION);
      res.send(index);
  })

  notFoundMiddleware.init( app )
  errorMiddleware.init( app )
  
  return app
}

export default create;