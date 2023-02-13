import CONFIG from 'common/config'
import appCreate from "./app";
import log from 'common/log';
import { Server as SocketIO } from 'socket.io';
import chat from './lib/io'
import * as fs from 'fs'

const PORT = CONFIG.SERVER.PORT.INT;

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
    if(CONFIG.SERVER.HTTPS){
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
  log.info(`HTTPS:\t${CONFIG.SERVER.HTTPS}`)
  if(CONFIG.SERVER.HTTPS){
    log.info(`CERTIFICATE:\t${__dirname}/../certificates/cert.crt`)
  }
  log.info(`PORT:\t${PORT}`)
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
