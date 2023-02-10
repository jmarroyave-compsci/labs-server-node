import CONFIG from 'common/config'
import session from "express-session"

export const init = ( app ) => {
  const localParams = {
    name: "sessid",
    secret: CONFIG.SERVER.SESSION.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: CONFIG.SERVER.SESSION.MAX_AGE,
      httpOnly: false,
      path: '/',
      domain: `${CONFIG.SERVER.URL.hostname}`,
    },
  }

  const serverParams = {
    name: "sessid",
    secret: CONFIG.SERVER.SESSION.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: "None",
      secure: true,
      maxAge: CONFIG.SERVER.SESSION.MAX_AGE,
      httpOnly: false,
      path: '/',
      domain: `${CONFIG.SERVER.URL.hostname}`,
    },
  }

  const params = (CONFIG.LOCAL) ? localParams : serverParams
  //console.log(params)
  app.use( session( params ) )
}

