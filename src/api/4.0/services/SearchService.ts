import DBSearch from 'v4/models/search-index';

export const searchResults = async function( params ) {
  const qry = ( params.qry ) ? decodeURIComponent(params.qry) : "";
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

  query['ty'] = { $in : entities } 
  
  if( year ){
    query['yr'] = { $gte : year - timeframe, $lte : year + timeframe } 
  }

  const data =  await DBSearch.find( query, { score : { $meta: 'textScore' } } )
      .sort( { score : { $meta : 'textScore' } } )
      .skip( pageSize * (page - 1) )
      .limit( pageSize );

  console.log("search", query, data.length)

  return data;
};

export const searchSuggestions = async function( params ) {
  var data =  await DBSearch.aggregate(
      [
          { $match : { ty: "tv_show", $text : { $search : params.qry } } },
          { "$group": { "_id": "$dc.title", count : { $sum : 1 } } },
          { "$limit": 5 },
      ]
  );

  console.log("suggestions", data.length)

  return {suggestions : data.map( d => d._id )};
};
