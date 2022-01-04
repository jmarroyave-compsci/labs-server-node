import DBSearch from 'v2/models/search-index';

export const searchResults = async function( params ) {
  const qry = ( params.qry ) ? params.qry : "";
  const page = ( params.page ) ? parseInt(params.page) : 1;
  const entities = ( params.entities ) ? JSON.parse(decodeURIComponent(params.entities)) : ["movie", "podcast", "tv_show", "video_game", "festival", "person"];
  const year = ( params.year ) ? parseInt(params.year) : null;
  const timeframe = ( params.timeframe ) ? parseInt(params.timeframe) : 1;
  const pageSize = 10;
  const query = {}

  if( qry == "") return []

  //query['entity'] = new RegExp(`^${params.qry}`)
  query['$text'] = { $search : params.qry}

  if( entities == "") return []

  query['type'] = { $in : entities } 
  
  if( year ){
    query['year'] = { $gte : year - timeframe, $lte : year + timeframe } 
  }

  //console.log(params, query)

  const data =  await DBSearch.find( query, { score : { $meta: 'textScore' } } )
      .sort( { score : { $meta : 'textScore' } } )
      .skip( pageSize * (page - 1) )
      .limit( pageSize );

  return data;
};

export const searchSuggestions = async function( params ) {
  var data =  await DBSearch.aggregate(
      [
          { $match : { $text : { $search : params.qry } } },
          { "$group": { "_id": "$entity", count : { $sum : 1 } } },
          { "$limit": 5 },
      ]
  );

  data = data.sort( (a,b) => (a.entity > b.entity ) ? 1 : -1 )

  return {suggestions : data.map( d => d._id )};
};
