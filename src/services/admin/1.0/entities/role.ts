import * as Repo from "../repositories/role";

export const getRoleByName = async function( query, params, session ) {
  return await Repo.findByName( params )
};