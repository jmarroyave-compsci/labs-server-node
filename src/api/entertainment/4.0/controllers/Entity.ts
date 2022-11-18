import * as HistoryService from 'api/global/1.0/services/HistoryService';
import * as Service from '../services/EntitiesService';
import * as ListsService from '../services/ListsService';

export async function movieGet( query, params, session ){
  return await Service.entityGet( { id: params.id  } );
};

export async function tvShowGet( query, params, session ){
  const data = Service.entityGet( { id: params.id  } );
  if(data != null) HistoryService.addTVShow(session.id, params.id)
  return data
};

export async function videoGameGet( query, params, session ){
  return await Service.entityGet( { id: params.id  } );
};

export async function moviesGet( query, params, session ){
  return await Service.entitiesGet( query, "movie" );
};

export async function tvShowsListGet( query, params, session ){
  const list = params.list
  const limit = query['limit'] ?? 10
  const page = query['page'] ?? 1
  const shuffle = query?.['shuffle'] ?? "true"

  var data;
  switch (list){
    case "user_recent":
      data = await HistoryService.getListItems( list, page, limit, session.id );
      break;
    default:
      data = await ListsService.getListItems( list, page, limit, shuffle == "true" );
  }

  return data
};

export async function tvShowsGet( query, params, session ){
  return await Service.entitiesGet( query, "tvShow" );
};

export async function videoGamesGet( query, params, session ){
  return await Service.entitiesGet( query, "videoGame" );
};

