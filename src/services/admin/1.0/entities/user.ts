import * as Repo from "../repositories/user";

export const findByGoogleId = async function( query, params, session ) {
  return await Repo.findByGoogleId( params.id )
};

export const findById = async function( query, params, session ) {
  return await Repo.findById( params.id )
};

export const insert = async function( query, params, session ) {
  return await Repo.insert( params )
};

