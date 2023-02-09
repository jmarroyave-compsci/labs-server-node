import * as Repo from "../repositories/user";
import * as Role from './role'

export const findByGoogleId = async function( query, params, session ) {
  return await Repo.findByGoogleId( params.id )
};

export const findByGithubId = async function( query, params, session ) {
  return await Repo.findByGithubId( params.id )
};

export const findById = async function( query, params, session ) {
  return await Repo.findById( params.id )
};

export const insert = async function( query, params, session ) {
  return await Repo.insert( params )
};

export const authorized = async function( query, params, session ) {
  if(!session.user) return false
  //console.log(session.user, params)

  const roleId = await Role.getRoleByName( query, { name : params.role }, session )

  //console.log(roleId, session.user.roles.includes( roleId))

  if(!roleId) return false

  return session.user.roles.includes( roleId )
};
