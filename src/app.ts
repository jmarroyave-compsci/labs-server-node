import cors from "cors";
import express from "express";
import * as env from "./env";
import { inOutLogger } from "./log";
import * as cls from "./lib/cls";
import { getCorsOptions } from "./cors_options";
import bodyParser from 'body-parser';
import log from "./log";
import * as fs from 'fs';


const app = express();

log.info(" - loading environment vars")
env.checkEnv();

log.info(" - configuring middleware")
app.use(cors(getCorsOptions()));
app.use(cls.setRequestId);
app.use(inOutLogger);
app.use(bodyParser.json({
strict: false
}));

log.info(" - routes")
log.info(`loading routes:`);
const routeRoot = `${__dirname}/routes`;

const loadRoutesFromDir = (routePath) => {
    fs.readdirSync(routePath).forEach(async (filename) => {

        if(fs.lstatSync(`${routePath}/${filename}`).isDirectory()){
            loadRoutesFromDir(`${routePath}/${filename}`);
            return;
        }
        log.info(` - /${filename.replace(".ts", "").replace("-", "/")}`);
        const route = `${routePath}/${filename}`;
        try {
            const item = await import(route);
            app.use('/', item.default);
        } catch (error) {
            log.error(error.message);
        }
    });

}

loadRoutesFromDir(routeRoot);

export default app;