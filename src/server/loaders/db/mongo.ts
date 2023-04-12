import { getServices } from 'common/files'
import { Connection } from 'common/db'
import log from 'common/log';

export async function loadDBMongo(){
  log.info("INIT DB CONNECTIONS", "MONGO")
  const services = await getServices()
  for(const service of services){
    log.info(` - [${service.name}/${service.version}] CONNECTING TO DB SERVER: [${service.config.DB.server}] DB: [${service.config.DB.database}]`)
    await Connection.connect(service)
  }
  //log.info(`CONNECTIONS INITIALIZED ${Object.keys(Connection.CONNECTIONS)}`)
}