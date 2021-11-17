import DBMovie from '../models/movie';
import DBTVShow from '../models/tv';
import DBVideoGame from '../models/game';
import * as StoriesService from './StoriesService';
import { getWhereFromQuery } from '../lib/queries';

export const entitiesGet = async function( params, type, paging=null ) {
  paging = (paging) ? paging : {}
  paging.page = (params.page) ? params.page : 1;
  paging.limit = (params.limit) ? params.limit : 4;

  const where = getWhereFromQuery(params.field);
 
  return await entitiesFind( where, type, paging )
} 

export const entitiesFind = async function( where, type, paging=null ) {
  paging = (paging) ? paging : {}
  paging.page = (paging.page) ? paging.page : 1;
  paging.limit = (paging.limit) ? paging.limit : 10;

  where = (where != null) ? where : {};

  let results = [];
  var model = null;

  console.log(where);

  switch(type){
    case "movie":
        model = DBMovie;
        break;
    case "tvShow":
        model = DBTVShow;
        break;
    case "videoGame":
        model = DBVideoGame;
        break;
  }

  results = await model.find( where )
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit);
      /*
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")
      */

  return ( results ) ? results : null
};
