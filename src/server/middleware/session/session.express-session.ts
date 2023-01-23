import CONFIG from 'common/config'
import session from "express-session"

export const init = ( app ) => {
  app.use(session({
    name: "sessid",
    secret: CONFIG.SERVER.SESSION.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: CONFIG.LOCAL ? false : 'none',
      secure: CONFIG.LOCAL ? false : true,
      maxAge: CONFIG.SERVER.SESSION.MAX_AGE,
      httpOnly: false,
    },
  })
)}

