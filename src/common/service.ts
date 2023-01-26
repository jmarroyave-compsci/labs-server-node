import config from 'common/config'
import { loadClass } from 'common/files'
import { getSession } from 'common/session'

export const invoke = async function( params ) {
  const { service, version, entity, operation, req, session={} } = params
  //console.log("service.invoke", service, version, operation)

  const facadeClass = `${__dirname}/../services/${service}/${version}/ports/facade/`
  //console.log("service.invoke", facadeClass)

  const ns = (await loadClass(facadeClass)).default
  //console.log("-> service.invoke", service, version, entity, operation, ns[entity][operation], "args", args)

  if( ! ns?.[entity]?.[operation] ){
    throw new Error(`SERVICE: ${service}[${version}].${entity}.${operation} IS NOT DEFINED`)
  }

  return await ns[entity][operation]({}, params.params ?? params.args , getSession(req, session) )
};

