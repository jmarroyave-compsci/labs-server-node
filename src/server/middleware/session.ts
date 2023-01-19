import CONFIG from 'common/config'
const cookieSession = require("cookie-session");

export const init = ( app ) => {
  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [CONFIG.SESSION.SECRET],
    })
  );
}

