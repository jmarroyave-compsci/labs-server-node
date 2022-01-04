import * as fs from 'fs'
import log from "config/log";

export const load = function(app){
    var dirs = [
        "1.0/routes",
        "2.0/routes",
        "global/routes",
    ]

    const rootPath = `${__dirname}/../api`

    dirs.forEach( path =>  loadRoutesFromDir(app, rootPath, `${rootPath}/${path}`) )
}

const loadRoutesFromDir = (app, routeRoot, routePath) => {
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

    dirs.forEach( dir => loadRoutesFromDir(app, routeRoot, dir))
}