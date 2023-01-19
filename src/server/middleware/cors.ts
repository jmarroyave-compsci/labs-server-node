import CONFIG from 'common/config'
import cors from "cors";

export const init = ( app ) => {
    console.log("CONFIGURING MIDDLEWARE", "CORS")
    //console.log(CONFIG.SERVER.CORS.WHITELIST)
    app.use( cors( {
        origin: (origin, callback) => {
            //console.log("CORS qry:", origin)
            if( CONFIG.SERVER.CORS.WHITELIST.includes( origin ) ){
                //console.log("it's good")
                callback( null, true )
            } else {
                callback( new Error("Not allowed by cors") )
            }
        },
        credentials : true,
    } ))
}

const middleware = function (err, req, res, next) {
}
