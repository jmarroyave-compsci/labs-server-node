import DBMovie from '../models/movie';
import { peopleFind } from './PeopleService';
import DBPodcast from '../models/podcast';
import DBStoryRemakes from '../models/story_remake';
import DBAwards from '../models/award';

export const getAwards = async function( params ) {
  const year = (params.year) ? params.year : new Date().getFullYear();
  const entity = (params.entity) ? params.entity : "movies";
  const type = (params.type) ? params.type : "oscar";
  const page = (params.page) ? params.page : 1;
  const qry = { "year" : year };
  const size = 10;

  var data =  await DBAwards.find( qry )
                .populate('festival')
                .skip(size * ( page - 1))
                .limit(size);

  /*
  data = data.sort( (a, b) => {
    if( a.year !== b.year )
      return (a.year > b.year) ? -1 : 1 

    if( a.festival.name !== b.festival.name )
      return (a.name > b.name) ? 1 : -1 
  });
  */

  if(!data) return [];
  return data;
};

export const getMovieRemakes = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const qry = {  };
  const size = 10;

  const data =  await DBStoryRemakes.find( qry )
                  .populate(
                    {
                        path:'recs',
                        options: {
                            limit: 5,
                            skip: 0
                        },
                        populate : {
                          path:'directors',                          
                        }
                    })  
                   .skip(size * ( page - 1))
                   .limit(size);

  console.log(data)

  if(!data) return [];
  return data;
};

export const getMovieHistory = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const qry = {  };
  const size = 10;

  const data =  await DBMovie.find( qry )
                             .skip(size * ( page - 1))
                             .limit(size);
  if(!data) return [];
  return data;
};

export const getPeopleDirectors = async function( params ) {
  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  const qry = {'directed.0' : { $exists : true }}
  return  await peopleFind( qry, { page : params.page, limit: params.limit} );
};

export const getPeopleActors = async function( params ) {
  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  const qry = {'acted.0' : { $exists : true }}
  return  await peopleFind( qry, { page : params.page, limit: params.limit} );
};

export const getPeopleWriters = async function( params ) {
  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  const qry = {'wrote.0' : { $exists : true }}
  return  await peopleFind( qry, { page : params.page, limit: params.limit} );
};

