import log from 'common/log';
import CONFIG from 'common/config'
import cors from "cors";

export const init = ( app ) => {
    //console.log(CONFIG.SERVER.CORS.WHITELIST)
    app.use( cors( {
        origin: (origin, callback) => {
            //console.log("CORS qry:", origin)
            if( !origin || origin.includes("//localhost") || CONFIG.SERVER.CORS.WHITELIST.includes( origin ) ){
                //console.log("it's good")
                callback( null, true )
            } else {
                callback( new Error(`CORS: [${origin}] not allowed.`), false )
            }
        },
        credentials : true,
        methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
    } ))
}

const middleware = function (req, res, next) {
    //log.info("CORS")
    return next()
}
