import config from 'common/config'
import * as fs from 'fs'
import { fileSearchReplace } from 'common/files'

const WEB_SERVER_CURRENT = "http://localhost:8080"
const WEB_SERVER = process.env.WEB_SERVER || config.WEB_SERVER

const FILES_PATH = `${__dirname}/../res`

export const getSpecs = async function( service, version ) {
  const spec = `${__dirname}/../services/${service}/${version}/ports/graphql/spec.yaml`;
  if(!fs.existsSync(spec)) return 
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = `${FILES_PATH}/docs/index.v.${params.version}.html`;
  return fileSearchReplace(spec, WEB_SERVER_CURRENT, WEB_SERVER);
};

