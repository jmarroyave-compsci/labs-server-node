import mongoose from 'mongoose';
import log from 'common/log';

export class Connection {
  static CONNECTIONS = {}
  version = ""
  server = ""
  database = ""

  constructor( props ){
    this.version = props.version
    this.server = props.server
    this.database = props.database
  }

  getConnection(){
    //const key = `${this.server}/${this.database}/${this.version}`
    const key = `${this.server}/${this.database}`
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
    //log.info(` DB: Creating schema`)
    return new mongoose.Schema( jsSchema, options )
  }

  model(name, jsSchema, options=null ){
    //name = `${this.database}_${name}_${this.version}`
    //log.info(` DB: Creating model [${name}]`)
    const schema = this.schema( jsSchema, options )
    return this.getConnection().model(name, schema);
  }
}


/*
function chat(io) {
    //`${process.env.?DB_SERVER ??  || process.env.DEFAULT_DB_SERVER}?retryWrites=true&w=majority&connectTimeoutMS=60000`,


  const getStore = () => {
    console.log("creating session store")
    const store = new MongoDBStore(session)({
      uri: config.DB_SERVER,
      collection: '__session'
    });
    
    store.on('error', function(error) {
      console.log(error);
    });
    return store  
  }


import MongoDBStore from 'connect-mongodb-session'

    mongoose
      .connect(DB_SERVER, {  })
      .then( async () => {
        log.info(`DB:\t${DB_SERVER.split("?")[0].split("@")[1].split("/")[0]}`)
      })
      .catch( ex => log.error(ex))

};
*/
