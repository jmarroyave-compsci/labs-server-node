import log from 'common/log';
//import { init as init_ } from "./session.cookie-session"
import { init as init_ } from "./session.express-session"


export const init = ( app ) => {
	init_( app )
	app.use(middleware)
}

const middleware = function (req, res, next) {
    log.info(`SESSION - ID: ${req.session.id}`);
    //log.info(`SESSION: ${JSON.stringify(req.session, null, 2)}`);
    //log.info(`SESSION - Cookie: ${JSON.stringify(req.session.cookie, null, 2)}`);
    return next();
}
