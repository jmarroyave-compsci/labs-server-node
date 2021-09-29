import * as fs from 'fs';

export const getSpecs = async function( params ) {
  console.log(params, "spec")
  const spec = `${__dirname}/../files/api.v.${params.version}.yaml`;
  return replace(spec);
};

export const getDocs = async function( params ) {
  const spec = `${__dirname}/../files/docs/index.v.${params.version}.html`;
  return replace(spec);
};

function replace(file){
  const WEB_SERVER_CURRENT = "http://localhost:8080"  
  const WEB_SERVER =  JSON.parse(fs.readFileSync(`${__dirname}/../../app.json`).toString()).env.WEB_SERVER.value
  var re = new RegExp(WEB_SERVER_CURRENT, "g");
  return fs.readFileSync(file).toString().replace(re, WEB_SERVER);
}
