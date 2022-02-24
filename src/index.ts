import app from "./app";
import log from "config/log";
import mongoose from "mongoose"
import config from 'config/config'
import { Server as SocketIO } from 'socket.io';
import chat from 'lib/io'
import * as fs from 'fs'

const PORT = config.PORT;
const DB_SERVER = config.DB_SERVER

if ( config.LOCAL){
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

log.info("")
log.info("")
log.info("-".repeat(50))
log.info("STARTING SERVER")
log.info("-".repeat(50))
log.info(`VERSION:\t${config.VERSION}`)
log.info(`PORT:\t${PORT}`)
log.info(`WEB-SOCKETS:\t${PORT}`)
log.info(`DB SERVER:\t${DB_SERVER.split("?")[0]}`)
log.info("-".repeat(50))

const initServer = () => {
    let server;
    if(config.LOCAL){
      const httpsOptions = {
        key: fs.readFileSync(`${__dirname}/files/certificates/localhost.key`),
        cert: fs.readFileSync(`${__dirname}/files/certificates/localhost.crt`),
      };
  
  
      server = require('https').createServer(httpsOptions, app)  
    } else {
      server = require('http').createServer(app)
    }
    

    //const io = io.listen(server);
    const io = new SocketIO(server,{
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    chat(io);

    server.listen(PORT, () => {
      log.info(`LISTENING ON PORT [${PORT}] \t OK`)
      log.info("-".repeat(50))
      log.info("")
      log.info("")
    });  
}

if (config.CACHE_SERVER == false){
  mongoose
    .connect(DB_SERVER, {  })
    .then( async () => {
      log.info("CONNECTED TO DB \t\t OK")
      initServer()
    })
    .catch( ex => log.error(ex))
}
else{
  log.info("CACHE SERVER, NOT CONNECTING TO DB")
  log.info("-".repeat(50))
  initServer()
}


