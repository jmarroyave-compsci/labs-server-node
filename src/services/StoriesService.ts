import DBMovie from '../models/movie';
import DBPeople from '../models/person';

import DBPodcast from '../models/podcast';


export const getMusicPodcasts = async function( params ) {
  const qry = { category: "music" };
  const project = "title  id  image  link -_id";
  const size = 10;

  const data =  await DBPodcast.find( qry, project ).limit(size);
  if(!data) return [];

  return data;
};

export const getAwards = async function( params ) {
  const year = (params.year) ? params.year : new Date().getFullYear();
  const entity = (params.entity) ? params.entity : "movies";
  const type = (params.type) ? params.type : "oscar";
  const qry = { 'awards.won': true, "awards.name" : type, "awards.year" : year };
  const project = "title  id awards -_id";
  const size = 10;

  var data;

  switch( entity ){
    case "movies":
    case "tv":
        data =  await DBMovie.find( qry, project ).skip(size * ( page - 1)).limit(size);
      break;
    case "people":
        data =  await DBPeople.find( qry, project ).skip(size * ( page - 1)).limit(size);
      break;
  }

  if(!data) return [];

  return data;
};
