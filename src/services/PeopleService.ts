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

export const peopleGet = async function( params, paging=null ) {
  paging = (paging) ? paging : {}
  paging.page = (params.page) ? params.page : 1;
  paging.limit = (params.limit) ? params.limit : 4;

  const where = getWhereFromQuery(params.field);
 
  return await peopleFind( where, paging )
} 

export const peopleFind = async function( where=null, paging=null ) {
  paging = (paging) ? paging : {}
  paging.page = (paging.page) ? paging.page : 1;
  paging.limit = (paging.limit) ? paging.limit : 10;

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
