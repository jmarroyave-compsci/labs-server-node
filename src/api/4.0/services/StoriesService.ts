import { peopleFind } from './PeopleService';
import DBPodcast from 'v4/models/podcast';
import DBStoryRemakes from 'v4/models/story_remake';
import DBAwards from 'v4/models/award';
import DBFestival from 'v4/models/festival';

export const getAwards = async function( params ) {
  const year = (params.year) ? params.year : new Date().getFullYear();
  var festival = (params.festival) ? params.festival : null;
  
  const page = (params.page) ? params.page : 1;
  const qry = { year : year };
  const size = 10;
  var data;

  if(festival != null){
    qry['idFestival'] = festival
  } 

  data = await DBAwards.find( qry, { "awarded.id" : 0} )
        .populate('festival')
        .skip(size * ( page - 1))
        .limit(size);

  for( var idx = 0; idx < data.length; idx++){
    data[idx].awarded = data[idx].awarded.sort( (a,b) => {
      if(a.category != b.category) return (a.category > b.category) ? 1 : -1
      return (a.entity < b.entity) ? -1 : 1
    } )    
  }

  data =  (data) ? data : [];
  return data;
};

export const getMovieRemakes = async function( params ) {
  const page = (params.page) ? params.page : 1;
  const limit = (params.limit) ? params.limit : 10;
  const extended = (params.extended) ? params.extended : true;
  const name = (params.name) ? params.name : null;
  const qry = {  };
  const MAX_MOVIES = (extended) ? 10 : 0;

  if( name ){
    qry['name'] = name
  }

  const data = await DBStoryRemakes.find( qry )
                    .populate(
                      {
                          path:'recs',
                          options: {
                              limit: MAX_MOVIES,
                              skip: 0
                          },
                          populate : {
                            path:'directed.id',                          
                          }
                      })  
                     .skip(limit * ( page - 1))
                     .limit(limit);

  if(!data) return [];
  return data;
};

export const getPeopleProducers = async function( params ) {
  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  const qry = {'produced.0' : { $exists : true }}
  return  await peopleFind( qry, { page : params.page, limit: params.limit} );
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

