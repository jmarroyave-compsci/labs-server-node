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

import errorMiddleware from 'middleware/error'
import cacheMiddleware from 'middleware/cache'
import guestbookMiddleware from 'middleware/guestbook'
import historyMiddleware from 'middleware/history'

const app = express();

log.info(" - configuring middleware")

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
/*
  cookie: { secure: true }
*/
}))

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