import DBEntity from 'v4/models/entity';
import * as StoriesService from './StoriesService';
import { getWhereFromQuery } from 'lib/queries';
import * as ListsService from 'v4/services/ListsService';

export const entityGetSimple = async function( params ) {
  const data = await DBEntity
      .findOne( { _id: params.id } )
  return data ? data.toObject() : null
};

export const entityGet = async function( params ) {
  var results;
  var result = await DBEntity
      .findOne( { _id: params.id } )
      .populate("people.stars")
      .populate("people.cast")
      .populate("people.produced")
      .populate("people.directed")
      .populate("people.written")
      .populate("people.crew")
      .populate("awards.festival")

  if(!result) return null

  var list;
  const page = 1, limit = 10;
  const resp = result.toObject();

  list = await ListsService.getListItems( `entity_${params.id}_related`, page, limit );
  if(list){
    resp['lists'].push( list )  
  }
  
  list = await ListsService.getListItems( `entity_${params.id}_remakes`, page, limit );
  if(list){
    resp['lists'].push( list )  
  }

  for(var genre of resp['info']["genres"]){
    list = await ListsService.getListItems( `genre_${genre}`, page, limit );
    if(!list) continue
    resp['lists'].push( list )    
  }

  return resp
};

export const entitiesGet = async function( params, type ) {
  const where = getWhereFromQuery(params.field);
  return await entitiesFindGet(type, where, {}, params.page, params.limit)
} 

export const entitiesFindGet = async function(type, where, sort, page, limit ) {
  return await entitiesFind( type, where, sort, page, limit )
} 

export const entitiesFind = async function( type, where, sort, page, limit ) {
  const paging = {page: 1, limit: 10}
  paging.page = (page) ? page : 1;
  paging.limit = (limit) ? limit : 10;

  where = (where != null) ? where : {};

  let results = [];
  var model = null;

  console.log(where);

  if( !where['type'] ){
    switch(type){
      case "movie":
          where['type'] = {$in : ["movie", "short"]};
          break;
      case "tvShow":
          where['type'] = {$in : ["tv_episode", "tv_mini_series","tv_movie","tv_pilot","tv_series","tv_short","tv_special"]};
          break;
      case "videoGame":
          where['type'] = {$in : ["video_game"]};
          break;
    }    
  }

  results = await DBEntity.find( where )
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit)
      .sort(sort)
      .populate("people.cast")
      .populate("people.produced")
      .populate("people.directed")
      .populate("people.written")
      .populate("people.crew")
      .populate("awards.festival")

  return ( results ) ? results : null
};
