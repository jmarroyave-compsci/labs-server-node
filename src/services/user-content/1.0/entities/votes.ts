import * as Repo from "../repositories/votes";
import { isAuthenticated } from 'common/security'

export const neutralVote = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}

  return await Repo.neutralVote( { 
    owner: params.owner,
    user: session.user, 
  } )
};

export const upVote = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}

  return await Repo.upVote( { 
    owner: params.owner,
    user: session.user, 
  } )
};

export const downVote = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}

  return await Repo.downVote( { 
    owner: params.owner,
    user: session.user, 
  } )
};

export const get = async function( query, params, session ) {
  var resp;

  if(!params.owner) return { error : "parameter missing"}

  resp = await Repo.get( { 
    owner: params.owner, 
    user: session.user, 
  } )

  if( resp.length > 0 ){
    return resp
  }

  if( params.forceInsert ){    
    await Repo.insert( { 
      owner: params.owner, 
      user: session.user, 
    } )
    resp = await Repo.get( { 
      owner: params.owner, 
      user: session.user, 
    } )

    //console.log("forcing insert", resp)

    return resp
  }

  return []
};

export const deleteOne = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}

  return await Repo.deleteOne( { 
    owner: params.owner,
  } )
};
