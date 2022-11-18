import mongoose from 'mongoose';
import config from 'config/config'
import log from "config/log";

export async function initConnections(){
  const conns = [
    ["server1", "entertainment", "4.0"],
    ["server2", "entertainment", "4.0"],
    ["server1", "stackexchange", "1.0"],
  ]

  log.info("INIT CONNECTIONS")

  for(const conn of conns){
    await connect(conn[0], conn[1], conn[2])
  }

  log.info(`CONNECTIONS INITIALIZED ${Object.keys(Connection.CONNECTIONS)}`)
}

async function connect( server, dbname, version ){
    const key = `${server}/${dbname}/${version}`
    try{
        server = config.DB.SERVERS[server]
        log.info(` DB: CONNECTING TO DB SERVER [${server}] DB [${dbname}]`)
        const connString = `mongodb+srv://${server}/${dbname}?retryWrites=true&w=majority`
        log.info(connString)
        const mconn = await mongooseCreateConnection(connString);
        //log.info(mconn.readyState)
        Connection.CONNECTIONS[key] = mconn
        log.info(" DB: CONNECTION SUCCESFULL")
        log.info("-".repeat(50))
      } catch( ex ){
        log.error(ex.toString())
      }
}

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
    const key = `${this.server}/${this.database}/${this.version}`
    const con = Connection.CONNECTIONS[key];     
    if(!con) new Error(`CONNECTION NOT FOUND, [${key}]`)
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
