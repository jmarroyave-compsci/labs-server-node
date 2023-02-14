import log from 'common/log';

/// Just for printing the line each time a new request 
export const init = ( app ) => {
    app.use(middleware);
}

const middleware = function(req, res, next) {
    console.log("-".repeat(80));
    log.info(`REQ - ${req.url}`);
    //log.info(`REQ HEADERS - ${JSON.stringify(req.headers, null, 2)}`);
    return next();
}