import DBSearch from '../models/search-index';

export const searchResults = async function( params ) {
  const page = ( params.page ) ? parseInt(params.page) : 1;
  const pageSize = 10;
  const data =  await DBSearch.find( { entity : new RegExp(`^${params.qry}`) } )
                            .sort({ type: -1, entity : 1, entityId: -1 })
                            .skip( pageSize * (page - 1) )
                            .limit(pageSize);

  console.log(data)
  return data;
};

export const searchSuggestions = async function( params ) {
  const data =  await DBSearch.aggregate(
      [
          { $match : { entity : new RegExp(`^${params.qry}`) } },
          { "$group": { "_id": "$entity", count : { $sum : 1 } } },
          { "$limit": 5 }
      ]
  );

  return {suggestions : data.map( d => d._id )};
};
