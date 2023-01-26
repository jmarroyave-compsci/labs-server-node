import { invoke } from 'common/service'
import * as Service from '../repositories/EntitiesService';
import * as ListsService from '../repositories/ListsService';

export async function movieGet( query, params, session ){
  return await Service.entityGet( { id: params.id  } );
};

export async function tvShowGet( query, params, session ){
  const data = Service.entityGet( { id: params.id  } );
  if(data != null){
    invoke({
      service: 'user-content',
      version: '1.0',
      entity: 'history',
      operation: 'insert',
      params: {
        inst: params.id,
        type: "tv-show",
      },
      session: session,
    })

  }
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

