import config from 'config/config'
import * as misc from 'lib/misc';
import * as fs from 'fs'

const WEB_SERVER_CURRENT = "http://localhost:8080"
const WEB_SERVER = process.env.WEB_SERVER || config.WEB_SERVER

const FILES_PATH = `${__dirname}/../files`

export const getSpecs = async function( service, version ) {
  const spec = `${__dirname}/../api/${service}/${version}/infra/graphql/spec.yaml`;
  if(!fs.existsSync(spec)) return 
  return misc.fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = `${FILES_PATH}/docs/index.v.${params.version}.html`;
  return misc.fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

