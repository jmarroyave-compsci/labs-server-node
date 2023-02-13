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

