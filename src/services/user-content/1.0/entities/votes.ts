import * as Repo from "../repositories/votes";
import * as Error from 'common/error'
import { isAuthenticated } from 'common/security'

export const neutralVote = async function( query, params, session ) {
  if(await isAuthenticated( session ) == false ) return Error.report("NOT_AUTH")

  if(!params.owner) return { error : "parameter missing"}

  const resp = await Repo.neutralVote( { 
    owner: params.owner,
    user: session.user, 
  } )

  return formatResponse( resp, params, session )
};

export const upVote = async function( query, params, session ) {
  if(await isAuthenticated( session ) == false ) return Error.report("NOT_AUTH")

  if(!params.owner) return { error : "parameter missing"}

  const resp = await Repo.upVote( { 
    owner: params.owner,
    user: session.user, 
  } )

  return formatResponse( resp, params, session )
};

export const downVote = async function( query, params, session ) {
  if(await isAuthenticated( session ) == false ) return Error.report("NOT_AUTH")

  if(!params.owner) return { error : "parameter missing"}

  const resp = await Repo.downVote( { 
    owner: params.owner,
    user: session.user, 
  } )

  return formatResponse( resp, params, session )
};

export const get = async function( query, params, session ) {
  var resp;

  if(!params.owner) return Error.report("NOT_PARAM")

  resp = await Repo.get( { 
    owner: params.owner, 
    user: session.user, 
  } )

  if( resp.length > 0 ){
    return formatResponse( resp, params, session )
  }

  if( params.forceInsert ){    
    await Repo.insert( { 
      owner: params.owner, 
      user: session.user, 
    } )
    resp = await Repo.get( { 
      owner: params.owner, 
      user: session.user, 
    } )
  }

  return formatResponse( resp, params, session )
};

export const deleteOne = async function( query, params, session ) {
   if(await isAuthenticated( session ) == false ) return Error.report("NOT_AUTH")

  if(!params.owner) return Error.report("NOT_PARAM")

  return await Repo.deleteOne( { 
    owner: params.owner,
  } )
};

const formatResponse = ( votes, params, session ) => {
  const user = session.user ? session.user : ( params.user ? { id : params.user } : null )

  const reformat = ( v ) => ({ 
      owner : v.owner,
      total : Repo.getTotal( v ), 
      me: Repo.getMe( v, user ),
      positive: v.upVotes.length,
      negative: v.downVotes.length,
    })

  if( Array.isArray(votes) ){
    return votes.map( reformat )
  } else {
    return reformat(votes)
  }
  
}