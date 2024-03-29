import CONFIG from 'common/config'
import passport from 'passport'
import { getRes } from 'common/docs'

export async function loginWithGithub( query, params, session ) {
  return passport.authenticate(
    "github"
  )
}

export async function loginWithGithubCallback( query, params, session ) {
  const successLoginUrl = CONFIG.SERVER.getURL("/admin/1.0/auth/login/github/success");
  const failureLoginUrl = CONFIG.SERVER.getURL("/admin/1.0/auth/login/github/error");

  params.onFailure = failureLoginUrl
  params.onSuccess = successLoginUrl

  return passport.authenticate("github", {
    failureRedirect: params.onFailure,
    successRedirect: params.onSuccess,    
  })    
}

export async function loginGithubSuccess( query, params, session ) {
  return ( req, res, next ) => {
    res.set('content-type', "text/html");   
    res.send( getRes("/pages/login-success.html") );
  }
}

export async function loginGithubError( query, params, session ) {
  return ( req, res, next ) => {
    res.set('content-type', "text/html");   
    res.send( getRes("/pages/login-error.html") );
  }
}