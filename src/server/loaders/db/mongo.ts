import mongoose from 'mongoose';
import { getServices, loadClass, classExists } from 'common/files'
import config from 'common/config'
import log from 'common/log';
import { Connection } from 'common/db'

export async function loadDBMongo(){
  const conns = []

  for(const service of getServices()){
    const configClass = `${service.versionPath}/config/`
    if( !classExists( configClass ) ) continue

    const { DB } = await loadClass(configClass)
    conns.push(
      [ DB.server, DB.database, service ]
    ) 
  }

  log.info("INIT CONNECTIONS")

  for(const conn of conns){
    await connect(conn[0], conn[1], conn[2])
  }

  log.info(`CONNECTIONS INITIALIZED ${Object.keys(Connection.CONNECTIONS)}`)
}

async function connect( server, dbname, service ){
    const key = `${server}/${dbname}/${service.version}`
    try{
        log.info(` DB: [${service.name}/${service.version}] CONNECTING TO DB SERVER: [${server}] DB: [${dbname}]`)
        server = config.DB.SERVERS[server]
        const connString = `mongodb+srv://${server}/${dbname}?retryWrites=true&w=majority`
        //log.info(connString)
        const mconn = await mongooseCreateConnection(connString);
        //log.info(mconn.readyState)
        Connection.CONNECTIONS[key] = mconn
        log.info(" DB: CONNECTION SUCCESFULL")
        log.info("-".repeat(50))
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
