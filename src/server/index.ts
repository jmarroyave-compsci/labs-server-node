import CONFIG from 'common/config'
import appCreate from "./app";
import log from 'common/log';
import { Server as SocketIO } from 'socket.io';
import chat from './lib/io'
import * as fs from 'fs'

const PORT = CONFIG.SERVER.PORT.INT.NUMBER;

console.log("CONFIG")
console.log(CONFIG)

if ( CONFIG.LOCAL){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const initServer = async ( app ) => {
    const listen = ( prot, server, port ) =>{
      //const io = io.listen(server);
      const io = new SocketIO(server,{
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      });
      chat(io);

      server.listen(port, () => {
        log.info(`LISTENING [${prot}] ON PORT [${port}] \t OK`)
        log.info("-".repeat(50))
      });        
    }

    let server;
    if(CONFIG.SERVER.PORT.INT.HTTPS){
      const httpsOptions = {
        key: fs.readFileSync(`${__dirname}/../../certificates/cert.key`),
        cert: fs.readFileSync(`${__dirname}/../../certificates/cert.crt`),
      };
  
      const https = require('https');
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

      server = https.createServer(httpsOptions, app)  
      listen("https", server, PORT)
      server = require('http').createServer(app)
      listen("http", server, Number(PORT) + 1)
    } else {
      server = require('http').createServer(app)
      listen("http", server, PORT)      
    }
    
}

export async function start(){
  const app = await appCreate()

  log.info("")
  log.info("")
  log.info("-".repeat(50))
  log.info("STARTING SERVER")
  log.info("-".repeat(50))
  log.info(`PATH:\t${__dirname}`)
  log.info(`VERSION:\t${CONFIG.VERSION}`)
  log.info(`PORT:`)
  log.info(` INTERNAL:`)
  log.info(`  NUMBER:\t${CONFIG.SERVER.PORT.INT.NUMBER}`)
  log.info(`  HTTPS:\t${CONFIG.SERVER.PORT.INT.HTTPS}`)
  if(CONFIG.SERVER.PORT.INT.HTTPS){
    log.info(`  CERTIFICATE:\t${__dirname}/../certificates/cert.crt`)
  }
  log.info(` EXTERNAL:`)
  log.info(`  NUMBER:\t${CONFIG.SERVER.PORT.EXT.NUMBER}`)
  log.info(`  HTTPS:\t${CONFIG.SERVER.PORT.EXT.HTTPS}`)
  log.info(`WEB-SOCKETS:\t${PORT}`)
  log.info("-".repeat(50))

  if (CONFIG.SERVER.CACHE == false){
  }
  else{
    log.info("CACHE SERVER, NOT CONNECTING TO DB")
    log.info("-".repeat(50))
  }

  initServer( app )
}
