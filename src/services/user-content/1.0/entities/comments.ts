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

  const item = await Repo.getById( { 
    id: params.id,
  } )

  Votes.deleteOne( query, {
    owner : item.owner,
  }, session)

  return Repo.deleteOne( { 
    id: params.id,
    user: session.user,
  } )
};

export const get = async function( query, params, session ) {
  if(!params.owner) return { error : "parameter missing"}
  if(!params.owner.page) return { error : "parameter missing"}

  var resp = await Repo.get( { 
    owner: params.owner, 
  } )

  resp = getVotes( resp, session )
  return resp
};

export const getReplies = async function( query, params, session ) {
  if(!params.id) return { error : "parameter missing"}

  var resp = await Repo.getReplies( { 
    id: params.id, 
  } )

  resp = getVotes( resp, session )
  return resp
};

const getVotes = async function( comments, session ){
  for( const c in comments ){
    comments[c].votes = await Votes.getOneMust({}, { 
      owner: comments[c].owner,
    }, session)
  }

  return comments
}

