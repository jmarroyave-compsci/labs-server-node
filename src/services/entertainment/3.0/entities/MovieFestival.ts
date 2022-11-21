import * as Service from '../repositories/MoviesFestivalsService';

export async function movieFestivalGet( query, params, session ){
  return await Service.getMovieFestival( { id: params.id  } );
};

export async function movieFestivalsGet( query, params, session ){
  return await Service.getMovieFestivals( query );
};
