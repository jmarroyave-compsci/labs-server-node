import cors from "cors";
import express from "express";
import * as env from "./env";
import { inOutLogger } from "./log";
import * as cls from "./lib/cls";
import { getCorsOptions } from "./cors";
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
const routePath = `${__dirname}/routes`;
log.info(`loading routes:`);
fs.readdirSync(routePath).forEach(async (filename) => {
	log.info(` - /${filename.replace(".ts", "").replace("-", "/")}`);
    const route = `${routePath}/${filename}`;
    try {
        const item = await import(route);
        app.use('/', item.default);
    } catch (error) {
        log.error(error.message);
    }
});


export default app;

