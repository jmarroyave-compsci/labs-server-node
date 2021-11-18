import DBEntity from '../models/entity';
import * as StoriesService from './StoriesService';
import { getWhereFromQuery } from '../lib/queries';

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

  //console.log(result)

  if(result){
    results = await StoriesService.getMovieRemakes( { name: result['title'], maxMovies: 50 } )
    result['remakes'] = (results.length > 0 && results[0].recs.length > 0) ? results[0].recs : []
  }

  return result
};

export const entitiesGet = async function( params, type ) {
  const where = getWhereFromQuery(params.field);
  return await entitiesFind( where, type, params )
} 

export const entitiesFind = async function( where, type, params=null ) {
  const paging = {page: 1, limit: 10}
  paging.page = (params.page) ? params.page : 1;
  paging.limit = (params.limit) ? params.limit : 10;

  where = (where != null) ? where : {};

  let results = [];
  var model = null;

  //console.log(where);

  switch(type){
    case "movie":
        where['type'] = {$in : ["movie", "short"]};
        break;
    case "tvShow":
        where['type'] = {$in : ["tvEpisode", "tvMiniSeries","tvMovie","tvPilot","tvSeries","tvShort","tvSpecial"]};
        break;
    case "videoGame":
        where['type'] = {$in : ["videoGame"]};
        break;
  }

  results = await DBEntity.find( where )
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit)
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")

  return ( results ) ? results : null
};
