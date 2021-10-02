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