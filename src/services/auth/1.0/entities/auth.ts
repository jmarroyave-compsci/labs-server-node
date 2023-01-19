import CONFIG from 'common/config'
import passport from 'passport'

export async function getUserInfo( query, params, session ) {
    console.log("getUserInfo", session.user)
    if( !session.user ) return null
    return { name : session.user.name, picture : session.user.picture }
}

export async function loginWithGoogle( query, params, session ) {
  return passport.authenticate(
    "google", 
    { scope: ["profile", "email"] }
  )
}

export async function loginWithGoogleCallback( query, params, session ) {
  const successLoginUrl = "http://localhost:3000/login/success";
  const errorLoginUrl = "http://localhost:3000/login/error";

  return passport.authenticate("google", {
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,    
  })    
}

export async function loginWithGoogleSuccess( query, params, session ) {
  return { ok : true }
}

export async function loginWithGoogleError( query, params, session ) {
  return { ok : false }
}

export async function logout( query, params, session ) {
    if( !session.__user ) return null
    await session.__user.logout();    
}