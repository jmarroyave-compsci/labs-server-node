import cors from "cors";
import express from "express";
import { Express, Request, Response, NextFunction, Send } from 'express';
import * as env from "./env";
import { inOutLogger } from "./log";
import * as cls from "./lib/cls";
import { getCorsOptions } from "./cors_options";
import bodyParser from 'body-parser';
import RequestID from 'express-request-id';
import log from "./log";
import * as fs from 'fs';
import responseTime from 'response-time';
import config from './config'
import * as misc from './lib/misc';
import * as GuestBook from './services/GuestsService';
import serveIndex from 'serve-index';

const app = express();

log.info(" - loading environment vars")
env.checkEnv();

log.info(" - configuring middleware")

app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else
    next();
});
app.use(cors(getCorsOptions()));
app.use(cls.setRequestId);
app.use(inOutLogger);
app.use(responseTime())
app.use(bodyParser.json({
strict: false
}));
app.use(RequestID())

log.info(" - routes")
log.info(`loading routes:`);
const routeRoot = `${__dirname}/routes`;

const loadRoutesFromDir = (routePath) => {
    const dirs = [];
    fs.readdirSync(routePath).sort().forEach(async (filename) => {

        if(fs.lstatSync(`${routePath}/${filename}`).isDirectory()){
            dirs.push(`${routePath}/${filename}`);
            return;
        }

        log.info(` - ${routePath.replace(routeRoot, "")}/${filename.replace(".ts", "").replace("-", "/")}`);
        const route = `${routePath}/${filename}`;
        try {
            const item = await import(route);
            app.use('/', item.default);
        } catch (error) {
            log.error(error.message);
        }
    });

    dirs.forEach( dir => loadRoutesFromDir(dir))

}

log.info(" - /repos")
app.use('/repos', express.static(__dirname + '/files/repos'), serveIndex(__dirname + '/files/repos'));

loadRoutesFromDir(routeRoot);

log.info(" - /")
app.all('/', function (req, res) {
    const file = `${__dirname}/files/docs/index.html`;
    const index = misc.fileSearchReplace(file, "__VERSION__", config.VERSION);
    res.send(index);
})


// catch 404 and forward to error handler
// log.info(" - 404")

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error', { res : res });

    res.type('text/plain');
    res.status(500).send( fs.readFileSync(`${__dirname}/files/errors/500.html`).toString() )
});


app.use(function(req, res, next) {
    const graphQL = req.originalUrl.includes("graphql");
    log.info(`REQ - ${req.url} [${req['id']}]`);

    const getKey = ( req, graphQL=false ) => {
        if(!graphQL) return req.originalUrl;
        var crypto = require('crypto');
        var name = JSON.stringify(req.body);
        var hash = crypto.createHash('md5').update(name).digest('hex');
        return [ hash, req.body ];
    }

    const getFilePath = ( req, graphQL=false) => {
        var [ key, body ] = getKey(req, graphQL);
        key = key.replace(/\//g, "_").replace("?", "+")
        var cacheFile = `${__dirname}/../cache/${(graphQL) ? "graphQL/" : ""}${key}.json`;
        return [cacheFile, key, body ];
    }

    var [ cacheFile, key, body ]  = getFilePath( req, graphQL );
    if( config.LOCAL && config.CACHE_SERVER && fs.existsSync( cacheFile )){
        if( graphQL ){
            log.info(`serving from cache [${req['id']}] [${key.substring(0,6)}] `)
            res.send(JSON.stringify(JSON.parse(fs.readFileSync(cacheFile).toString()).data))
            return;
        }
    }


    const overwrite = false;

    const saveResults = (results, from) => {
        if(!results) return;

        try{
            results = JSON.parse(results)    
        } catch(ex){
            return;
        }

        if(results['errors']) return;

        const data = JSON.stringify({ data : results, body: body}, null, 2);
        if(config.LOCAL){
            fs.writeFileSync(cacheFile, data);            
            //console.log(from.toLowerCase(), "->", body.operationName)
            if(!body.operationName) return;
            const dataTestFile = `${__dirname}/../test/v.2.0/data/${body.operationName?.toLowerCase()}.json`;
            if(!fs.existsSync(dataTestFile)){
                fs.writeFileSync(dataTestFile, data);
            }
            fs.writeFileSync(`${__dirname}/../cache/operations/${body.operationName?.toLowerCase()}.json`, data);
        }
    }

    const oldSend = res.send;
    res.send = function() : Response {
        saveResults( arguments[0], "send" )
        return oldSend.apply(this, arguments);
    }

    const oldJSON = res.json;
    res.json = function() : Response {
        saveResults( arguments[0], "json" )
        return oldJSON.apply(this, arguments);
    }

    const oldEnd = res.end;
    res.end = function() : Response {
        saveResults( arguments[0], "end" )
        return oldEnd.apply(this, arguments);
    }

    next();
});

app.use(function(req, res, next) {
    GuestBook.saveGuest(req)
    next();
});


app.use(function (err, req, res, next) {
    console.log(err.stack);
});



export default app;

