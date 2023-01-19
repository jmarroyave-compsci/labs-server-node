import config from 'common/config'
import { loadClass } from 'common/files'

export const invoke = async function( params ) {
  const { service, version, entity, operation, args, req } = params
  //console.log("service.invoke", service, version, operation)

  const facadeClass = `${__dirname}/../services/${service}/${version}/ports/facade/`
  //console.log("service.invoke", facadeClass)

  const ns = (await loadClass(facadeClass)).default
  //console.log("service.invoke", ns)
  //console.log("service.invoke", ns, entity, operation, ns[entity][operation])

  return await ns[entity][operation]({}, args, req?.session )
};

