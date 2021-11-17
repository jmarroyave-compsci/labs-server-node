import DBFestival from '../models/festival';
import * as StoriesService from './StoriesService';

export const getMovieFestival = async function( params ) {
  let results = null;
  results = await DBFestival.findOne( { _id: params.id } );
  return (results) ? results : null
};

export const getMovieFestivals = async function( params ) {
  let results = [];
  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  results = await DBFestival.find().limit(params.limit).skip( params.limit * (params.page - 1) );
  return results
};

