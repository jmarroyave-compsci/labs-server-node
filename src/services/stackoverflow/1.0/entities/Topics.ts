import * as service from "../repositories/all";

export async function suggest( query, params, session ){
  try{
    return service.topic_suggest( query.q );
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }

  return {};
};


