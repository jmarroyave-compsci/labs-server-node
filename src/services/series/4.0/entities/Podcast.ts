import * as Service from '../repositories/PodcastsService';

export async function podcastGet( query, params, session ){
  return await Service.podcastGet( { id: params.id  } );
};

export async function podcastsGet( query, params, session ){
  return await Service.podcastsGet( query );
};

export async function podcastMusicGet( query, params, session ){
  return await Service.getPodcastsByCategory( { ...query, category: "music" } );
};
