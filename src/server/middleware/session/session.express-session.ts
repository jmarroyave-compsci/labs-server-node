import CONFIG from 'common/config'
import session from "express-session"

export const init = ( app ) => {
  app.use(session({
    secret: CONFIG.SESSION.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }));
}

