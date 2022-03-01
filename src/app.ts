import cors from "cors";
import express from "express";
import { Express, Request, Response, NextFunction, Send } from 'express';
import { inOutLogger } from "config/log";
import * as cls from "lib/cls";
import bodyParser from 'body-parser';
import RequestID from 'express-request-id';
import log from "config/log";
import * as fs from 'fs';
import config from 'config/config'
import * as misc from 'lib/misc';
import serveIndex from 'serve-index';
import { load as loadRoutes } from 'loaders/routes';

import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'

const getStore = () => {
  console.log("creating session store")
  const store = new MongoDBStore(session)({
    uri: config.DB_SERVER,
    collection: '__session'
  });
  
  store.on('error', function(error) {
    console.log(error);
  });
  return store  
}

/*
import helmet from 'helmet'
import hpp from 'hpp'
import csurf from 'csurf'
import limiter from 'express-rate-limit'
*/

import errorMiddleware from 'middleware/error'
import cacheMiddleware from 'middleware/cache'
import guestbookMiddleware from 'middleware/guestbook'
import historyMiddleware from 'middleware/history'

const app = express();

log.info(" - configuring middleware")

/*
// Set Security Configs
app.use(helmet());
app.use(hpp());
*/

app.use(session({
  name: 'session',
  secret: config.SESSION.SECRET,
  store: getStore(),
  resave: true,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      secure: false,
      maxAge: config.SESSION.MAX_AGE
  },
}))

/*
app.use(csurf());
app.use(limiter);
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
loadRoutes(app)

log.info(" - /repos")
app.use('/repos', express.static(__dirname + '/files/repos'), serveIndex(__dirname + '/files/repos'));

log.info(" - /")
app.all('/', function (req, res) {
    const file = `${__dirname}/files/docs/index.html`;
    const index = misc.fileSearchReplace(file, "__VERSION__", config.VERSION);
    res.send(index);
})


// catch 404 and forward to error handler
// log.info(" - 404")

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


export default app;