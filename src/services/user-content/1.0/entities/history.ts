import * as Repo from "../repositories/history";

export const insert = async function( query, params, session ) {
  if(!session.user) return

  return Repo.insert( { 
    type: params.type, 
    inst: params.inst, 
    userId: session.user.id,
  } )
};

