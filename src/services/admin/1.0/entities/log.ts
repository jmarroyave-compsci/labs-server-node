import * as Repo from "../repositories/log";

export const insert = async function( query, params, session ) {
  return Repo.insert( { 
    agent: session?.agent?.source, 
    endpoint: session.endpoint, 
    userId: session.user ? session.user.id : null,
  } )
};

export const get = async function( query, params, session ) {
  return Repo.get( params )
};

export const count = async function( query, params, session ) {
  return Repo.count( params )
};

