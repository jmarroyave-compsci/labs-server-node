import CONFIG from 'common/config'
import session from "express-session"

export const init = ( app ) => {
  app.use(session({
    name: "SESS_NAME",
    secret: CONFIG.SESSION.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: CONFIG.LOCAL ? 'None' : 'None',
      secure: CONFIG.LOCAL ? false : true,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
    },
  })
)}

