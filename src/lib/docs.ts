import config from 'config/config'
import * as misc from 'lib/misc';

const WEB_SERVER_CURRENT = "http://localhost:8080"
const WEB_SERVER = process.env.WEB_SERVER || config.WEB_SERVER

const FILES_PATH = `${__dirname}/../files`

export const getSpecs = async function( params ) {
  const spec = `${FILES_PATH}/api.v.${params.version}.yaml`;
  return misc.fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = `${FILES_PATH}/docs/index.v.${params.version}.html`;
  return misc.fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

