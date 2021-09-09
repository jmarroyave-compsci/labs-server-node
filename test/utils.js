// Set up Chai
const axios = require('axios')
const SERVER = "http://localhost:8080/api"

module.exports.get = async function(endpoint){
  const uri = `${SERVER}/${endpoint}`;
  const res = await axios.get(uri);
  return res;
}