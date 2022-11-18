import * as Service from "../services/CommentsService";

export async function addComment( query, params, session ){
  return await Service.addComment( query );
};