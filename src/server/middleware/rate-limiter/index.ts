import log from 'common/log';
const { RateLimiterMemory } = require('rate-limiter-flexible');

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function(req, res, next) {
  log.info(`RATE`);

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  const key = ip
  const pointsToConsume = 1;

  console.log("RATE:", key, pointsToConsume)

  const rateLimiter = new RateLimiterMemory({
    points: 20,
    duration: 1,
  });

  rateLimiter.consume(key, pointsToConsume) 
    .then((rateLimiterRes) => {
      return next();
    })
    .catch((rej) => {
      return res.status(429).send('Too Many Requests');
    });   
};
