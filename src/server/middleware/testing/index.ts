import * as fs from 'fs'
import log from 'common/log';
import { getResourcePath } from 'common/files'

export const init = ( app ) => {
    //app.use(middleware)
}

const middleware = function (req, res, next) {
    log.info(`TESTING`);

    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
      return res.redirect(301, req.url.slice(0, -1));
    else
      return next();
}
