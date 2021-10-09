import DBMovie from '../models/movie';
import DBPeople from '../models/person';
import DBPodcast from '../models/podcast';

export const getMusicPodcasts = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const qry = { category: "music" };
  const project = "title  id  image  link -_id";
  const size = 10;

  const data =  await DBPodcast.find( qry, project )
                                .skip(size * ( page - 1))
                                .limit(size);
  if(!data) return [];

  return data;
};

export const getAwards = async function( params ) {
  const year = (params.year) ? params.year : new Date().getFullYear();
  const entity = (params.entity) ? params.entity : "movies";
  const type = (params.type) ? params.type : "oscar";
  const page = (params.page) ? params.page : 1;
  const qry = { 'awards.won': true, "awards.name" : type, "awards.year" : year };
  const project = "title id image awards -_id";
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

  data = data.sort( (a, b) => {
    if( a.year !== b.year )
      return (a.year > b.year) ? -1 : 1 

    if( a.name !== b.name )
      return (a.name > b.name) ? 1 : -1 

    if( a.won !== b.won )
      return (a.won) ? 1 : -1 

    return (a.category > b.category) ? 1 : -1 
  });


  if(!data) return [];

  return data;
};


export const getRemakes = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const qry = {  };
  const size = 10;

  const data =  await DBMovie.find( qry )
                             .skip(size * ( page - 1))
                             .limit(size);
  if(!data) return [];

  return data;
};