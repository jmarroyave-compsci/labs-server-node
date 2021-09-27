import DBPodcast from '../models/podcast';

export const podcastGet = async function( params ) {
  let results = [];
  results = await DBPodcast.find( { id: params.id } ).select(` -_id`);
  return (results.length > 0) ? results[0] : null
};
