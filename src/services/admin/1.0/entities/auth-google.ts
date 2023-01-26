import CONFIG from 'common/config'
import passport from 'passport'
import { getRes } from 'common/docs'

export async function loginWithGoogle( query, params, session ) {
  return passport.authenticate(
    "google", 
    { scope: ["profile", "email"] }
  )
}

export async function loginWithGoogleCallback( query, params, session ) {
  const successLoginUrl = CONFIG.SERVER.getServerURL("/admin/1.0/auth/login/google/success");
  const failureLoginUrl = CONFIG.SERVER.getServerURL("/admin/1.0/auth/login/google/error");

  console.log(successLoginUrl)

  params.onFailure = failureLoginUrl
  params.onSuccess = successLoginUrl

  return passport.authenticate("google", {
    failureRedirect: params.onFailure,
    successRedirect: params.onSuccess,    
  })    
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