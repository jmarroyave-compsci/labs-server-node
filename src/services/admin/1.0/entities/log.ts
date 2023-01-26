import * as Repo from "../repositories/log";

export const insert = async function( query, params, session ) {
  return Repo.insert( { 
    agent: session?.agent?.source, 
    endpoint: session.endpoint, 
    userId: session.user ? session.user.id : null,
  } )
};

