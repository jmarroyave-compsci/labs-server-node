import CONFIG from 'common/config'
import { loadClass, getService } from 'common/files'
import { getSession } from 'common/session'
import { connect as connectToDB } from 'server/loaders/db/mongo'

export const invoke = async function( params ) {
  const { service, version, entity, operation, req, session={} } = params
  //console.log("service.invoke", service, version, operation)

  // loading service
  await loadService( service, version)

  const facadeClass = `${__dirname}/../services/${service}/${version}/ports/facade/`
  //console.log("service.invoke", facadeClass)

  var ns;
  try{
    ns = (await loadClass(facadeClass)).default
  } catch( ex) {
    throw Error(`There was a problem loading facade for service [${service}]`)
  }

  console.log(`-> Invoking SERVICE: [${service}:${version}] OP: [${entity}.${operation}] ARGS: [${params.args}]`, ns[entity][operation])

  if( ! ns?.[entity]?.[operation] ){
    throw new Error(`SERVICE: ${service}[${version}].${entity}.${operation} IS NOT DEFINED`)
  }

  printTrace( params )

  const parameters = params.params ?? params.args
  return await ns[entity][operation]({}, parameters , getSession(req, session) )
};

function printTrace( params ){
  if( !CONFIG.DEBUG.SERVICES.PRINT_INVOKES ) return

  const { service, version, entity, operation, req, session={} } = params
  const parameters = params.params ?? params.args
  console.log("*".repeat(80))
  console.log("INVOKE")
  console.log("entity:", entity)
  console.log("op:", operation)
  console.log("params:", parameters)
  console.log("*".repeat(80))
}

async function loadService( serviceName, version  ){
  const service = await getService(serviceName, version)
  await connectToDB(service)
}