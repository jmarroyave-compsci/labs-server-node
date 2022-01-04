import DBEntity from 'v1/models/entity';
import { getWhereFromQuery } from 'lib/queries';

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
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")

  return ( results ) ? results : null
};
