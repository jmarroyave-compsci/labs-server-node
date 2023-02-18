import * as Repo from "../repositories/messages";
import { isAuthenticated } from 'common/security'

export const insert = async function( query, params, session ) {
  if(!params.owner) return { error : "parameter missing"}
  if(!params.text) return { error : "parameter missing"}
  if(!params.params) return { error : "parameter missing"}

  return Repo.insert( { 
    owner: params.owner, 
    text: params.text, 
    params: params.params, 
  } )
};

export const deleteOne = async function( query, params, session ) {
  if(!params.id) return { error : "parameter missing"}

  return Repo.deleteOne( { 
    id: params.id,
    user: session.user,
  } )
};

