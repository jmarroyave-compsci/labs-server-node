import DBPodcast from 'v2/models/podcast';
import { getWhereFromQuery } from 'lib/queries';

export const podcastGet = async function( params ) {
  let results = [];
  return await DBPodcast.findOne( { _id: params.id } );
};

export const podcastsGet = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const size = 10;

  const where = getWhereFromQuery(params.field);
  console.log(params.field, where);
  return await DBPodcast.find( where )
                        .skip(size * ( page - 1))
                        .limit(size);
};

export const getPodcastsByCategory = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const category = (params.category) ? params.category : "music";
  const qry = { category: category };
  const size = 10;
  const data =  await DBPodcast.find( qry )
                                .skip(size * ( page - 1))
                                .limit(size);

  if(!data) return [];
  return data;
};
