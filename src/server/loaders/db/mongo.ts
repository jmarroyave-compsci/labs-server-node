import mongoose from 'mongoose';
import { getServices, loadClass, classExists } from 'common/files'
import config from 'common/config'
import log from 'common/log';
import { Connection } from 'common/db'

export async function loadDBMongo(){
  log.info("INIT DB CONNECTIONS", "MONGO")
  const services = await getServices()
  for(const service of services){
    log.info(` - [${service.name}/${service.version}] CONNECTING TO DB SERVER: [${service.config.DB.server}] DB: [${service.config.DB.database}]`)
    await connect(service)
  }
  //log.info(`CONNECTIONS INITIALIZED ${Object.keys(Connection.CONNECTIONS)}`)
}

export async function connect( service ){
  //console.log("DB: connect", service)
  if( service.config.DB == null ) return

  const server = service.config.DB.server
  const dbname = service.config.DB.database

  const key = `${server}/${dbname}/${service.version}`
  try{
      const connString = `mongodb+srv://${config.DB.SERVERS[server]}/${dbname}?retryWrites=true&w=majority`
      //log.info(connString)
      const mconn = await mongooseCreateConnection(connString);
      //log.info(mconn.readyState)
      Connection.CONNECTIONS[key] = mconn
      //log.info(" DB: CONNECTION SUCCESFULL")
      //log.info("-".repeat(50))
    } catch( ex ){
      log.error(ex.toString())
    }
}

async function mongooseCreateConnection( connString ){
  const mconn = await mongoose.createConnection(connString, {
    bufferCommands: false,
    autoIndex: false,
  }).asPromise();
  return mconn
}

async function mongooseConnect( connString ){
  return new Promise( ( resolve, reject ) => {
    mongoose.connect(connString, {
      bufferCommands: false,
      autoIndex: false,
    }).then( resp => resolve( mongoose ) )
    .catch( ex => reject(ex) );
  })
}
