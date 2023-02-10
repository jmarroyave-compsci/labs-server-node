import log from 'common/log';

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function(req, res, next) {
  const cookies = {} 
  req.headers.cookies?.split('; ').forEach( c => {
    const d = c.split("=").map( c1 => decodeURIComponent(c1) )
    cookies[d[0]] = d[1]
  })

  log.info(`COOKIES: ${JSON.stringify(cookies, null, 2)}`)

  return next()
};


