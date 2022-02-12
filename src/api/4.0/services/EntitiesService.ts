import DBEntity from 'v4/models/entity';
import * as StoriesService from './StoriesService';
import { getWhereFromQuery } from 'lib/queries';

export const entityGet = async function( params ) {
  var results;
  var result = await DBEntity
      .findOne( { _id: params.id } )
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")

  if(result){
    results = await StoriesService.getMovieRemakes( { name: result['title'], maxMovies: 50 } )
    result['remakes'] = (results.length > 0 && results[0].recs.length > 0) ? results[0].recs : []
  }

  return result
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
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")

  return ( results ) ? results : null
};
