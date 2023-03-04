import log from 'common/log';
const { RateLimiterMemory } = require('rate-limiter-flexible');

const MAX_POINTS = 10
// requests per second per ip
const rateLimiter = new RateLimiterMemory({
  points:   MAX_POINTS,
  duration: 1,
});

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  const key = ip
  const pointsToConsume = 1;

  rateLimiter.consume(key, pointsToConsume) 
    .then((rateLimiterRes) => {
      log.info(`RATE LIMITER: K:[${key}] P:[${rateLimiterRes.consumedPoints}/${rateLimiterRes.consumedPoints + rateLimiterRes.remainingPoints}]`)      
      return next();
    })
    .catch((rej) => {
      //log.info(`RATE LIMITER: FAILED K:[${key}] P:[${rateLimiterRes.consumedPoints}/${pointsToConsume}]`)      
      log.info(`RATE LIMITER: QUOTA EXCEEDED K:[${key}] sec:[${rej.msBeforeNext / 1000}]`)      
      return res.status(429).send('Too Many Requests');
    });   
};
