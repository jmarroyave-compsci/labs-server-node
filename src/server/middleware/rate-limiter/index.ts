const { RateLimiterMemory } = require('rate-limiter-flexible');

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  const key = ip
  const pointsToConsume = 1;

  const rateLimiter = new RateLimiterMemory({
    points: 20,
    duration: 1,
  });
  rateLimiter.consume(key, pointsToConsume) 
    .then((rateLimiterRes) => {
      next();
    })
    .catch((rej) => {
      res.status(429).send('Too Many Requests');
    });   
};
