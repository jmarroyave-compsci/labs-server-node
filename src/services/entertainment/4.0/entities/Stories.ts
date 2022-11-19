import * as Service from '../repositories/StoriesService';

export async function awards( query, params ){
  return await Service.getAwards( query );
};

export async function remakes( query, params){
  return await Service.getMovieRemakes( query );
};

/*
export async function history( query, params){
  return await Service.getMovieHistory( query );
};
*/

export async function peopleDirectors( query, params){
  return await Service.getPeopleDirectors( query );
};

export async function peopleProducers( query, params){
  return await Service.getPeopleProducers( query );
};

export async function peopleWriters( query, params){
  return await Service.getPeopleWriters( query );
};

export async function peopleActors( query, params){
  return await Service.getPeopleActors( query );
};


