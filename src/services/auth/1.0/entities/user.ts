import * as Repo from "../repositories/user-service";

export const findByGoogleId = async function( query, params, session ) {
  return await Repo.findByGoogleId( params.id )
};

export const findById = async function( query, params, session ) {
  return await Repo.find( params.id )
};

export const insert = async function( query, params, session ) {
  return await Repo.insert( params )
};

