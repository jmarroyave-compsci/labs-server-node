import DBPodcast from '../models/podcast';

export const podcastGet = async function( params ) {
  let results = [];
  return await DBPodcast.findOne( { _id: params.id } );
};

export const podcastsGet = async function( params ) {
  let results = [];
  results = await DBPodcast.find(  );
  return (results.length > 0) ? results[0] : null
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

  //console.log(data)

  return data;
};
