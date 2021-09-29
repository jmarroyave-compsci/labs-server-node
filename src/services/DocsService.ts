import * as fs from 'fs';
import config from '../config'

export const getSpecs = async function( params ) {
  const spec = `${__dirname}/../files/api.v.${params.version}.yaml`;
  return replace(spec);
};

export const getDocs = async function( params ) {
  const spec = `${__dirname}/../files/docs/index.v.${params.version}.html`;
  return replace(spec);
};

function replace(file){
  const WEB_SERVER_CURRENT = config.WEB_SERVER
  const WEB_SERVER = process.env.WEB_SERVER || WEB_SERVER_CURRENT
  const re = new RegExp(WEB_SERVER_CURRENT, "g");
  return fs.readFileSync(file).toString().replace(re, WEB_SERVER);
}
