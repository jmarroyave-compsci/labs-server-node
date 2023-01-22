import CONFIG from 'common/config'
import passport from 'passport'
import { getRes } from 'common/docs'

export async function getUserInfo( query, params, session ) {
  return ( req, res, next ) => {
    var resp;
    if( !session?.user ){
      console.log("auth/me", false)
      resp =  { auth: false }
    } else {
      resp =  { auth: true, name : session.user.name, avatar : session.user.picture }
      console.log("auth/me", true)
    }

    res.set('content-type', "application/json");
    res.send( JSON.stringify(resp) );         

  }
}

export async function loginWithGoogle( query, params, session ) {
  return passport.authenticate(
    "google", 
    { scope: ["profile", "email"] }
  )
}

export async function loginWithGoogleCallback( query, params, session ) {
  const successLoginUrl = CONFIG.SERVER.getServerURL("/auth/1.0/login/google/success");
  const failureLoginUrl = CONFIG.SERVER.getServerURL("/auth/1.0/login/google/error");

  console.log(successLoginUrl)

  params.onFailure = failureLoginUrl
  params.onSuccess = successLoginUrl

  return passport.authenticate("google", {
    failureRedirect: params.onFailure,
    successRedirect: params.onSuccess,    
  })    
}

export async function logout( query, params, session ) {
  return ( req, res, next ) => {
    if( req?.logout ){
      req.logout()
      res.end()
    }
  }
}

export async function loginGoogleSuccess( query, params, session ) {
  return ( req, res, next ) => {
    res.set('content-type', "text/html");   
    res.send( getRes("/pages/login-success.html") );
  }
}

export async function loginGoogleError( query, params, session ) {
  return ( req, res, next ) => {
    res.set('content-type', "text/html");   
    res.send( getRes("/pages/login-error.html") );
  }
}