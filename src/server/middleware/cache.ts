import * as fs from 'fs';
import config from 'common/config'
import log from 'common/log';


const CACHE_PATH = `${__dirname}/../../cache`


const middleware = function(req, res, next) {
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
        var cacheFile = `${CACHE_PATH}/${(graphQL) ? "graphQL/" : ""}${key}.json`;
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
            //const dataTestFile = `${__dirname}/../test/v.2.0/data/${body.operationName?.toLowerCase()}.json`;
            //if(!fs.existsSync(dataTestFile)){
               // fs.writeFileSync(dataTestFile, data);
            //}
            fs.writeFileSync(`${CACHE_PATH}/operations/${body.operationName?.toLowerCase()}.json`, data);
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
}

export default middleware