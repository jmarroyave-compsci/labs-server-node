import appCreate from "./app";
import log from "config/log";
import config from 'config/config'
import { Server as SocketIO } from 'socket.io';
import chat from 'lib/io'
import * as fs from 'fs'

const PORT = config.PORT;

if ( config.LOCAL){
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
    if(config.HTTPS){
      const httpsOptions = {
        key: fs.readFileSync(`${__dirname}/../certificates/cert.key`),
        cert: fs.readFileSync(`${__dirname}/../certificates/cert.crt`),
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
      listen("http", server, Number(PORT))      
    }
    
}

async function main(){
  const app = await appCreate()

  log.info("")
  log.info("")
  log.info("-".repeat(50))
  log.info("STARTING SERVER")
  log.info("-".repeat(50))
  log.info(`PATH:\t${__dirname}`)
  log.info(`VERSION:\t${config.VERSION}`)
  log.info(`HTTPS:\t${config.HTTPS}`)
  if(config.HTTPS){
    log.info(`CERTIFICATE:\t${__dirname}/../certificates/cert.crt`)
  }
  log.info(`PORT:\t${PORT}`)
  log.info(`WEB-SOCKETS:\t${PORT}`)
  log.info("-".repeat(50))

  if (config.CACHE_SERVER == false){
  }
  else{
    log.info("CACHE SERVER, NOT CONNECTING TO DB")
    log.info("-".repeat(50))
  }

  initServer( app )
}

main().catch( ex => console.error(ex))