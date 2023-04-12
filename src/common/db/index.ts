import log from 'common/log';
import * as mongo from 'common/db/mongo'

export class Connection {
  static CONNECTIONS = {}
  static getKey = ( params ) => {
    const { server, dbname, version } = params
    const key = `${server}/${dbname}/${version}`
    return key
  }
  static connect = async( service ) => {
    if( service.config.DB == null ) return

    const key = Connection.getKey(service.config.DB)
    if(Connection.CONNECTIONS[key] != null ) {
      return
    }

    try{
      const mconn = await mongo.connect(service.config.DB)
      Connection.CONNECTIONS[key] = mconn
    } catch( ex ){
      log.error(ex.toString())
    }
  }

  params = null

  constructor( params ){
    this.params = params
  }

  getConnection(){
    const key = Connection.getKey(this.params)
    const con = Connection.CONNECTIONS[key];     
    if(!con) {
      throw new Error(`FATAL ERROR: CONNECTION TO DB NOT FOUND, [${key}], SERVICE UNINITIALIZED`)
    }
    //console.log(Connection.CONNECTIONS)
    return con
  }

  collection( name ){
    return this.getConnection().collection(name);     
  }

  schema( jsSchema, options=null ){
    return mongo.schema( jsSchema, options )
  }

  model(name, jsSchema, options=null ){
    const schema = this.schema( jsSchema, options )
    return this.getConnection().model(name, schema);
  }
}