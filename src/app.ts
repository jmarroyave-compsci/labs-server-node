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
log.info("route /")
app.all('/', function (req, res) {
  res.sendFile(`${__dirname}/files/docs/index.html`)
})
log.info("route 404")


app.use(function(req, res, next) {
    log.info(`REQUEST - ${req.url} `);
    next();
});


app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500).send( fs.readFileSync(`${__dirname}/files/errors/500.html`).toString() )
});

export default app;

