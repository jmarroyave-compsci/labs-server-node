//import { inOutLogger } from 'common/log';
import log from 'common/log';

export const init = ( app ) => {
    app.use(middleware);
}

const middleware = function(req, res, next) {
    console.log("-".repeat(80));
    log.info(`REQ - ${req.url}`);
    next();
}