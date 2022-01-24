import DBPerson from 'v4/models/person';
import { getWhereFromQuery } from 'lib/queries';

const MAX_PEOPLE_WORKED_WITH = 10;
const MAX_MOVIES = 50;

export const personGet = async function( params ) {
  let results = [];
  results = await DBPerson.find( { _id: params.id } )
      .populate("produced.id")
      .populate({
            path:'directed.id',
            options: {
                limit: MAX_MOVIES,
                skip: 0
            },
      })  
      .populate({
            path:'acted.id',
            options: {
                limit: MAX_MOVIES,
                skip: 0
            },
      })  
      .populate({
            path:'crew.id',
            options: {
                limit: MAX_MOVIES,
                skip: 0
            },
      })  
      .populate({
            path:'wrote.id',
            options: {
                limit: MAX_MOVIES,
                skip: 0
            },
      })  
      .populate("awards.festival")
      .populate({
            path:'directedTo.p',
            options: {
                limit: MAX_PEOPLE_WORKED_WITH,
                skip: 0
            },
      })  
      .populate({
            path:'directedBy.p',
            options: {
                limit: MAX_PEOPLE_WORKED_WITH,
                skip: 0
            },
      })  
      .populate({
            path:'actedWith.p',
            options: {
                limit: MAX_PEOPLE_WORKED_WITH,
                skip: 0
            },
      })  
  console.log(results)
  return (results) ? results[0] : null
};

export const peopleGet = async function( params ) {
  const where = getWhereFromQuery(params.field);
  return await peopleFind( where, params )
} 

export const peopleFind = async function( where, params=null ) {
  const paging = { page: 1, limit: 10}
  paging.page = params?.page ?? 1;
  paging.limit = params?.limit ?? 10;

  where = (where != null) ? where : {};

  let results = [];

  console.log(where);

  results = await DBPerson.find( where )
      .populate("produced.id")
      .populate("directed.id")
      .populate("wrote.id")
      .populate("acted.id")
      .populate("crew.id")
      .populate("awards.festival")
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit);

  return ( results ) ? results : null
};
