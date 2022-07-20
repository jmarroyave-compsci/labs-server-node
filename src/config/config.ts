import * as fs from 'fs'; 
import dotenv from 'dotenv'

var CONF = dotenv.config().parsed
var _package_ = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`).toString());

const LOCAL = (!process.env.DB_SERVER && process.env.DEFAULT_DB_SERVER.includes("127.0.0.1"))

const config = {
  PORT: process.env.PORT || process.env.DEFAULT_PORT,
  DB_SERVER: `${process.env.DB_SERVER || process.env.DEFAULT_DB_SERVER}?retryWrites=true&w=majority&connectTimeoutMS=60000`,
  WEB_SERVER: process.env.DEFAULT_WEB_SERVER,
  VERSION: _package_.version,
  DB_VERSION: _package_.version,
  CACHE_SERVER: (process.env.CACHE_SERVER === "true") ? true : false,
  PLUGINS: {
    GOOGLE_ANALYTICS: {
      BASE_URL: process.env.PLUGINS_GOOGLE_ANALYTICS_BASE_URL,
      TRACK_ID: process.env.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
    }
  },
  LOCAL: LOCAL,
  SESSION : {
    SECRET: process.env.SESSION_SECRET,
    MAX_AGE: (1000 * 60 * 60 * 24) * parseInt(process.env.SESSION_MAX_AGE_DAYS),
  },
  CORS: { origin: process.env.CORS.split("|"), credentials: true },
  HTTPS: (process.env.HTTPS == "true") ? true : false,
}

console.log(process.env.CACHE_SERVER)

console.log(config)
export default config;