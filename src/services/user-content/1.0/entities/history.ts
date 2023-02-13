import * as Repo from "../repositories/history";
import { isAuthenticated } from 'common/security'

export const insert = async function( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  return Repo.insert( { 
    type: params.type, 
    inst: params.inst, 
    userId: session.user.id,
  } )
};

