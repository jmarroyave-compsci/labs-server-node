import DBPerson from '../models/person';

export const personGet = async function( params ) {
  let results = [];
  results = await peopleFind( { id: params.id } )
  return (results) ? results[0] : null
};


export const peopleFind = async function( where, paging=null ) {
  paging = (paging) ? paging : {}
  paging.page = (paging.page) ? paging.page : 1;
  paging.limit = (paging.limit) ? paging.limit : 10;

  where = (where) ? where : {};

  let results = [];

  results = await DBPerson.find( where )
      .populate("wrote")
      .populate("acted")
      .populate("directed")
      .populate("awards.festival")
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit);

  return ( results ) ? results : null
};
