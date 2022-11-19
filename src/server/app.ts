import cors from "cors";
import express from "express";
import { Express, Request, Response, NextFunction, Send } from 'express';
import { inOutLogger } from 'common/log';
import * as cls from "./lib/cls";
import bodyParser from 'body-parser';
import RequestID from 'express-request-id';
import log from 'common/log';
import * as fs from 'fs';
import config from 'common/config'
import { fileSearchReplace } from 'common/files';
import serveIndex from 'serve-index';
import { loadREST, loadGraphQL } from './loaders/routes';
import { initConnections } from 'common/db'

import session from 'express-session'

import errorMiddleware from './middleware/error'
import cacheMiddleware from './middleware/cache'
import guestbookMiddleware from './middleware/guestbook'
import historyMiddleware from './middleware/history'

async function create(){
  await initConnections()

  const app = express();

  log.info(" - configuring middleware")

  /*
  app.use(session({
    name: 'session',
    secret: config.SESSION.SECRET,
    store: (config.LOCAL) ? null : getStore(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: config.SESSION.MAX_AGE
    },
  })
  */

  app.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
      res.redirect(301, req.url.slice(0, -1));
    else
      next();
  });
  app.use(cors( config.CORS ));
  app.use(cls.setRequestId);
  app.use(inOutLogger);
  app.use(bodyParser.json({
  strict: false
  }));
  app.use(RequestID())

  log.info(" - routes")
  log.info(`loading routes:`);
  await loadGraphQL(app)
  await loadREST(app)

  log.info(" - /repos")
  app.use('/repos', express.static(__dirname + '/files/repos'), serveIndex(__dirname + '/files/repos'));

  log.info(" - /")
  app.all('/', function (req, res) {
      const file = `${__dirname}/files/docs/index.html`;
      const index = fileSearchReplace(file, "__VERSION__", config.VERSION);
      res.send(index);
  })

  // error handler
  app.use(errorMiddleware)

  // cache
  app.use(cacheMiddleware)

  // guestbook
  app.use(guestbookMiddleware)

  // history
  app.use(historyMiddleware)

  app.use(function (err, req, res, next) {
      console.log(err.stack);
  });

  return app
}

export default create;