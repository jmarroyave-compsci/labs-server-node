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
      resp =  { auth: true, id: session.user.id, name : session.user.name, avatar : session.user.avatar }
      console.log("auth/me", true)
    }

    res.set('content-type', "application/json");
    res.send( JSON.stringify(resp) );         
  }
}

export async function logout( query, params, session ) {
  return ( req, res, next ) => {
    if( req?.logout ){
      req.logout()
      res.end()
    }
  }
}

