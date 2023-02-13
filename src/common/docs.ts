import CONFIG from 'common/config'
import * as fs from 'fs'
import { fileSearchReplace, getResourcePath, getFile } from 'common/files'

const WEB_SERVER_PLACEHOLDER = "http://localhost:8080/"
const WEB_SERVER = CONFIG.SERVER.getURL("")

export const getRes = function( res ) {
  const spec = getResourcePath(res);
  return getFile(spec);
};

export const getSpecs = function( service, version ) {
  const spec = `${__dirname}/../services/${service}/${version}/ports/graphql/spec.yaml`;
  return fileSearchReplace(spec, WEB_SERVER_PLACEHOLDER, WEB_SERVER);
};

export const getDocs = async function( params ) {
  const spec = getResourcePath(`/docs/index.v.${params.version}.html`);
  return fileSearchReplace(spec, WEB_SERVER_PLACEHOLDER, WEB_SERVER);
};

