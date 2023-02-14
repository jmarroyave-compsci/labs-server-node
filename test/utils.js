const CONFIG = require('../src/common/config')
const axios = require('axios')

var VERBOSE=CONFIG.VERBOSE

function log(){
  if (!VERBOSE) return;
  console.log.apply(this, arguments)
}

module.exports.get = async function(endpoint, verbose=CONFIG.VERBOSE){
  VERBOSE = verbose
  
  const uri = `${CONFIG.SERVER}/${endpoint}`;
  log("fetch", uri);
  const res = await axios.get(uri);
  log("response", res);

  VERBOSE = CONFIG.VERBOSE

  return res;
}


const openGraphQLURL = "2.0/graphql?"

module.exports.graphQL = async function(query, verbose=CONFIG.VERBOSE){
  VERBOSE = verbose
  
  const uri = `${CONFIG.SERVER}/${openGraphQLURL}`;
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
    VERBOSE = CONFIG.VERBOSE  
  }
}