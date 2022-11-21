import config from 'common/config'
import { fileSearchReplace } from 'common/files';

const WEB_SERVER_CURRENT = config.WEB_SERVER
const WEB_SERVER = process.env.WEB_SERVER || WEB_SERVER_CURRENT

export const getSpecs = async function( params ) {
  const spec = `${__dirname}/../files/api.v.${params.version}.yaml`;
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = `${__dirname}/../files/docs/index.v.${params.version}.html`;
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

