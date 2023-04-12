const CONFIG = require('common/config')
const axios = require('axios')
const { getHash } = require('common/data')

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

module.exports.graphQL = async function(query, verbose=CONFIG.VERBOSE){
  VERBOSE = verbose
  
  const openGraphQLURL = "2.0/graphql?"
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

module.exports.getMockSession = (  ) => ( {
  user : {
    id: "testid",
    name: "Test user",
    avatar: "https://localhost/user-test.jpg",
    roles : [
      "63e549641d3e092bdb926e7a"
    ],
  }, 
} )

module.exports.hash = ( txt ) => getHash(txt)

