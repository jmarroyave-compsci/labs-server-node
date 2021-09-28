import DBMovie from '../models/movie';
import DBPerson from '../models/person';
import DBPodcast from '../models/podcast';


export const getMusicPodcasts = async function( params ) {
  const qry = { category: "music" };
  const project = "title  id  image  link -_id";
  const size = 10;

  const data =  await DBPodcast.find( qry, project ).limit(size);
  if(!data) return [];

  return data;
};

export const getMovieAwards = async function( params ) {
  const qry = { 'awards.won': true };
  const project = "title  id awards -_id";
  const size = 10;

  const data =  await DBMovie.find( qry, project ).limit(size);
  if(!data) return [];

  return data;
};
