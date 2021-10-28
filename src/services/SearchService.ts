import DBSearch from '../models/search-index';

export const searchResults = async function( params ) {
  const qry = ( params.qry ) ? params.qry : "";
  const page = ( params.page ) ? parseInt(params.page) : 1;
  const entities = ( params.entities ) ? JSON.parse(decodeURIComponent(params.entities)) : ["movie", "podcast", "tv_show", "video_game", "festival", "person"];
  const pageSize = 10;

  if( qry == "") return []
  if( entities == "") return []

  console.log(params)

  const data =  await DBSearch.find( { entity : new RegExp(`^${params.qry}`), type : { $in : entities} } )
                            .sort({ ranking: -1, entity : 1  })
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
