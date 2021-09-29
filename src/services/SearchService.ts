import DBSearch from '../models/search';

export const searchResults = async function( params ) {
  const data =  await DBSearch.find( { entity : new RegExp(`^${params.qry}`) } )
                            .limit(10);
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
