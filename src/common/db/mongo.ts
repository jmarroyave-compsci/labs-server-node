import mongoose from 'mongoose';
import log from 'common/log';
import CONFIG from 'common/config';

export async function connect( params ){
  try{
      const { server, dbname } = params
      const connString = `mongodb+srv://${CONFIG.DB.SERVERS[server]}/${dbname}?retryWrites=true&w=majority`
      const mconn = await mongooseCreateConnection(connString);
      return mconn
    } catch( ex ){
      log.error(ex.toString())
      throw ex
    }
}

export function schema( jsSchema, options=null ){
  return new mongoose.Schema( jsSchema, options )
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
