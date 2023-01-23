import CONFIG from 'common/config'
const cookieSession = require("cookie-session");

export const init = ( app ) => {
  app.use(
    cookieSession({
      maxAge: CONFIG.SERVER.SESSION.MAX_AGE,
      keys: [CONFIG.SERVER.SESSION.SECRET],
    })
  );
}

