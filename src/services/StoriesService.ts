import DBMovie from '../models/movie';
import { peopleFind } from './PeopleService';
import DBPodcast from '../models/podcast';
import DBStoryRemakes from '../models/story_remake';
import DBAwards from '../models/award';
import DBFestival from '../models/festival';

export const getAwards = async function( params ) {
  const year = (params.year) ? params.year : new Date().getFullYear();
  var festival = (params.festival) ? params.festival : null;
  
  const page = (params.page) ? params.page : 1;
  const qry = { year : year };
  const size = 10;

  var data;

  if(festival != null){
    festival = await DBFestival.findOne({id: festival}) 
    qry['festival'] = festival._id
  } 

  data = await DBAwards.find( qry, { "awarded._id" : 0} )
        .populate('festival')
        .skip(size * ( page - 1))
        .limit(size);

  for( var idx = 0; idx < data.length; idx++){
    data[idx].awarded = data[idx].awarded.sort( (a,b) => {
      if(a.category != b.category) return (a.category > b.category) ? 1 : -1
      return (a.entity < b.entity) ? -1 : 1
    } )    
  }

  console.log(data[0].awarded)

  data =  (data) ? data : [];
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

