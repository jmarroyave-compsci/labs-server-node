import bodyParser from 'body-parser';
import requestID from 'express-request-id';
import userAgent from 'express-useragent';

export const init = ( app ) => {
  app.use(bodyParser.json({
    strict: false
  }));
  app.use(userAgent.express());
  //app.use(requestID())
}