import log from 'common/log';

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function(req, res, next) {
  const cookies = {} 
  const d = req.headers.cookies ?? req.headers.cookie
  d?.split('; ').forEach( c => {
    const d = c.split("=").map( c1 => decodeURIComponent(c1) )
    cookies[d[0]] = d[1]
  })

  //log.info(`COOKIES: ${JSON.stringify(cookies, null, 2)}`)

  return next()
};


