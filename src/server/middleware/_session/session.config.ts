import url from 'url'

export function getParameters( CONFIG, LOCAL ){
  if( LOCAL ){
    return {
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
        domain: url.parse(CONFIG.SERVER.getURL("")).hostname,
      },
    }
  } else {
    return {
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
        domain: url.parse(CONFIG.SERVER.getURL("")).hostname,
      },
    }
  }
}

