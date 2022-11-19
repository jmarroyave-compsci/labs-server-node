import * as Service from "../repositories/CommentsService";

export async function addComment( query, params, session ){
  return await Service.addComment( query );
};