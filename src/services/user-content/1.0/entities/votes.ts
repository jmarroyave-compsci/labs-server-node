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
  if(!params.owner) return { error : "parameter missing"}

  return await Repo.get( { 
    owner: params.owner, 
    user: session.user, 
  } )
};

export const getOneMust = async function( query, params, session ) {
  if(!params.owner) return { error : "parameter missing"}

  const resp = await get( query, params, session )

  if( resp.length == 1 ){
    return resp[0]
  }

  return await Repo.insert( { 
    owner: params.owner, 
    user: session.user, 
  } )
};

export const deleteOne = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}

  return await Repo.deleteOne( { 
    owner: params.owner,
  } )
};
