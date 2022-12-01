import * as repo from "../repositories/tags";

export async function getTags( query, params, session ){
  return await repo.get( {} );
};