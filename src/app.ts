import cors from "cors";
import express from "express";
import * as env from "./env";
import { inOutLogger } from "./log";
import * as cls from "./lib/cls";
import { getCorsOptions } from "./cors_options";
import bodyParser from 'body-parser';
import log from "./log";
import * as fs from 'fs';
import responseTime from 'response-time';
import config from './config'
import * as misc from './lib/misc';

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
    log.info(`REQUEST - ${req.url} `);
    next();
});


app.use(function (err, req, res, next) {
    console.log(err.stack);
});

export default app;

