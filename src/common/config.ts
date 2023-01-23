import * as fs from 'fs'; 
import dotenv from 'dotenv'
import url from 'url';

const loadCORS = () => {
  var DATA = process.env.SERVER_CORS;
  if(!DATA){
    DATA = fs.readFileSync(`${__dirname}/../../cors.txt`).toString()
  } 
  const CORS = DATA.trim().split("\n").map( c => c.trim() ).map( c => c.endsWith("/") ? c.slice(0, -1) : c)
  return CORS
}

var CONF = dotenv.config().parsed
var _package_ = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`).toString());

const DB_SERVERS = {}
process.env.DB_SERVERS.split("||").map( server => {
  const [ name, uri ] = server.split("|")
  DB_SERVERS[name] = uri
}) 

const config = {
  DB: {
    SERVERS : DB_SERVERS,
  },
  SERVER : {
    CACHE: (process.env.SERVER_CACHE === "true") ? true : false,
    PORT: parseInt(process.env.SERVER_PORT),
    HTTPS: (process.env.SERVER_HTTPS == "true") ? true : false,
    URL: url.parse(process.env.SERVER_URL),
    getServerURL: ( url ) => `${config.SERVER.URL.href}${url}`,
    CORS: { 
      WHITELIST: loadCORS(), 
    },
    SESSION : {
      SECRET: process.env.SESSION_SECRET,
      MAX_AGE: (1000 * 60 * 60 * 24) * parseInt(process.env.SESSION_MAX_AGE_DAYS),
    },
  },
  PLUGINS: {
    GOOGLE_ANALYTICS: {
      BASE_URL: process.env.PLUGINS_GOOGLE_ANALYTICS_BASE_URL,
      TRACK_ID: process.env.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
    },
    GOOGLE_AUTH: {
      CLIENT_ID: process.env.PLUGINS_GOOGLE_AUTH_CLIENT_ID,
      SECRET: process.env.PLUGINS_GOOGLE_AUTH_SECRET,
    },
    JWT: {
      SECRET: process.env.PLUGINS_JWT_SECRET,
    },
  },
  VERSION: _package_.version,
  LOCAL: process.env.LOCAL === "false" ? false : true,
  DEBUG : {
    SERVICES: {
      SKIPPED: process.env.SERVICES_SKIPPED?.split(",") ?? []
    },
  },
}


console.log("CONFIG")
console.log(config)

export default config;