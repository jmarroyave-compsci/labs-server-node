import DBMovie from '../models/movie';

export const movieGet = async function( params ) {
  let results = [];
  results = await DBMovie.findOne( { id: params.id } ).select(` -_id`);

  console.log(results)

  return (results) ? results : null
};

export const moviesGet = async function( params ) {
  let results = [];

  params.limit = (params.limit) ? Number(params.limit) : 10;
  params.page = (params.page) ? Number(params.page) : 1;
  const { page=1, limit=10, fields="id,title,description,country,type,genre,duration,rating,released_date,added_date,director,cast" } = params
  results = await DBMovie.find().select(`${fields.split(",").join(" ")} -_id`).limit(limit).skip( limit * (page - 1) );
  return results
};
