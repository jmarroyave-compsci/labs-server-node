import DBPerson from '../models/person';
import { getWhereFromQuery } from '../lib/queries';

export const personGet = async function( params ) {
  let results = [];
  results = await DBPerson.find( { _id: params.id } )
      .populate("produced.id")
      .populate("directed.id")
      .populate("wrote.id")
      .populate("acted.id")
      .populate("crew.id")
      .populate("awards.festival")

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
