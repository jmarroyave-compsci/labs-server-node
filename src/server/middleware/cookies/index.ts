import log from 'common/log';
import cookieParser from "cookie-parser"

export const init = ( app ) => {
    app.use(cookieParser)
    app.use(middleware)
}

const middleware = function(req, res, next) {
  log.info("COOKIES")
  log.info(`COOKIES: ${JSON.stringify(req.cookies, null, 2)}`)
  return next()
};


