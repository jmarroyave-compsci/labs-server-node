import CONFIG from 'common/config'
import {fileSearchReplace} from 'common/files';

const WEB_SERVER_CURRENT = "http://localhost:8080"
const WEB_SERVER = CONFIG.SERVER.URL

export const getSpecs = async function( params ) {
  const spec = `${__dirname}/../files/api.v.${params.version}.yaml`;
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = `${__dirname}/../files/docs/index.v.${params.version}.html`;
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

