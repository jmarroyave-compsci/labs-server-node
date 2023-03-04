import * as Repo from "../repositories/comments";
import * as Votes from "./votes";
import { isAuthenticated } from 'common/security'

export const insert = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}
  if(!params.text) return { error : "parameter missing"}

  return Repo.insert( { 
    owner: params.owner, 
    text: params.text, 
    user: session.user,
  } )
};

export const reply = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.id) return { error : "parameter missing"}
  if(!params.text) return { error : "parameter missing"}

  return Repo.reply( { 
    id: params.id,
    text: params.text,
    user: session.user,
  } )
};

export const deleteOne = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.id) return { error : "parameter missing"}

  return Repo.deleteOne( { 
    id: params.id,
    user: session.user,
  } )
};

export const getAll = async function( query, params, session ) {
  if(!params.owner) return { error : "parameter missing"}
  if(!params.owner.page) return { error : "parameter missing"}

  const resp = await Repo.getAll( { 
    owner: params.owner, 
  } )

  for( const c in resp ){
    resp[c].votes = await Votes.get({}, { 
      owner: resp[c].id,
    }, session)
  }

  return resp
};

export const getAllReplies = async function( query, params, session ) {
  if(!params.id) return { error : "parameter missing"}

  const resp = await Repo.getAllReplies( { 
    id: params.id, 
  } )

  for( const c in resp ){
    resp[c].votes = await Votes.get({}, { 
      owner: resp[c].id,
    }, session)
  }

  return resp
};

