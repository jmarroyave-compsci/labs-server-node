import * as Repo from "../repositories/messages";
import { isAuthenticated } from 'common/security'

export const insert = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  if(!params.owner) return { error : "parameter missing"}
  if(!params.text) return { error : "parameter missing"}
  if(!params.params) return { error : "parameter missing"}

  return Repo.insert( { 
    owner: params.owner, 
    text: params.text, 
    params: params.params, 
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

