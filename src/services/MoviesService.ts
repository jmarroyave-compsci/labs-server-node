import DBMovie from '../models/movie';
import DBFestival from '../models/festival';
import * as StoriesService from './StoriesService';

export const movieGet = async function( params ) {
  let results = null;
  results = await DBMovie
    .find( { _id: params.id } )
    .populate("directors")
    .populate("writers")
    .populate("cast")
    .populate("crew")
    .populate("awards.festival")
    
  var result = (results && results.length > 0) ? results[0] : null

  if(result){
    results = await StoriesService.getMovieRemakes( { name: result.title, maxMovies: 50 } )
    result['remakes'] = (results.length > 0 && results[0].recs.length > 0) ? results[0].recs : []
  }

  //console.log(result)
  console.log("remakes", result.remakes.length)

  return result;
};

export const moviesGet = async function( params ) {
  let results = [];

  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  results = await DBMovie.find().limit(params.limit).skip( params.limit * (params.page - 1) );


  return results
};

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

