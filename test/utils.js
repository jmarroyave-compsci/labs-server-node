const config = require('./config')
const axios = require('axios')

var VERBOSE=config.VERBOSE

function log(){
  if (!VERBOSE) return;
  console.log.apply(this, arguments)
}

module.exports.get = async function(endpoint, verbose=config.VERBOSE){
  VERBOSE = verbose
  
  const uri = `${config.SERVER}/${endpoint}`;
  log("fetch", uri);
  const res = await axios.get(uri);
  log("response", res);

  VERBOSE = config.VERBOSE

  return res;
}


const openGraphQLURL = "2.0/graphql?"

module.exports.graphQL = async function(query, verbose=config.VERBOSE){
  VERBOSE = verbose
  
  const uri = `${config.SERVER}/${openGraphQLURL}`;
  log("fetching", uri);
  try{
    const res = await axios.request({
      method: "POST",
      url: uri,
      headers : {
       "Content-Type": "application/json; charset=utf-8",
      },
      data: query,
    });
    log("response", res);
    return res;
  } catch(ex){
    console.error(ex.toJSON());
  } finally{
    VERBOSE = config.VERBOSE  
  }
}