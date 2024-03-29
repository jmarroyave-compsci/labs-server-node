import * as fs from 'fs'; 
import dotenv from 'dotenv'

const PACKAGE = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`).toString());

const loadCORS = () => {
  var DATA = process.env.SERVER_CORS;
  if(!DATA){
    DATA = fs.readFileSync(`${__dirname}/../../cors.txt`).toString()
  } 
  const CORS = DATA.trim().split("\n").map( c => c.trim() ).map( c => c.endsWith("/") ? c.slice(0, -1) : c)
  return CORS
}

function getDBServers(){
  const DB_SERVERS = {}
  process.env.DB_SERVERS.split("||").map( server => {
    const [ name, uri ] = server.split("|")
    DB_SERVERS[name] = uri
  })
  return DB_SERVERS
} 

export function getConfig( stage="dev" ){
  const envFile = ( stage == "dev" ) ? '.env' : '.env.production' 
  dotenv.config({ 
    path : `${__dirname}/../../${envFile}`,
    override: true,
  })

  const getURL = ( path ) => {
    const serverURL = `${ CONFIG.SERVER.PORT.EXT.HTTPS ? "https" : "http" }://${ CONFIG.SERVER.HOST }${ CONFIG.SERVER.PORT.EXT.NUMBER == 440 ? "" : `:${CONFIG.SERVER.PORT.EXT.NUMBER}`}`
    const resp = `${serverURL}/${ path.startsWith("/") ? path.slice(1) : path }`
    return resp;
  }

  const CONFIG = {
    DB: {
      SERVERS : getDBServers(),
    },
    SERVER : {
      CACHE: (process.env.SERVER_CACHE === "true") ? true : false,
      HOST: process.env.SERVER_HOST,
      PORT: {
        INT : {
          NUMBER: process.env.PORT ? parseInt(process.env.PORT) : parseInt(process.env.SERVER_PORT_INT_NUMBER),
          HTTPS: process.env.SERVER_PORT_INT_HTTPS == "true",
        },
        EXT : {
          NUMBER: parseInt(process.env.SERVER_PORT_EXT_NUMBER),
          HTTPS: process.env.SERVER_PORT_EXT_HTTPS == "true",
        },
      },
      getURL: getURL,
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
      GITHUB_AUTH: {
        CLIENT_ID: process.env.PLUGINS_GITHUB_AUTH_CLIENT_ID,
        SECRET: process.env.PLUGINS_GITHUB_AUTH_SECRET,
      },
      JWT: {
        SECRET: process.env.PLUGINS_JWT_SECRET,
      },
      SENDGRID: {
        KEY: process.env.PLUGINS_SENDGRID_KEY,
        SENDER: process.env.PLUGINS_SENDGRID_SENDER,
      },
      OPENAI: {
        KEY : process.env.PLUGINS_OPENAI_API_KEY,
      },
    },
    SERVICES: {
      JM: {
        NOTIFY_MAIL: process.env.SERVICES_JM_NOTIFY_MAIL,
      },
    },
    VERSION: PACKAGE.version,
    LOCAL: process.env.LOCAL === "false" ? false : true,
    DEBUG : {
      SERVICES: {
        PRINT_INVOKES : false,
        SKIPPED: process.env.SERVICES_SKIPPED?.split(",") ?? [],
      },
    },
  }


  return CONFIG
}


export default getConfig();