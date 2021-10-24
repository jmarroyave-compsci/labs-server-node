import * as fs from 'fs'; 
import dotenv from 'dotenv'

var CONF = dotenv.config().parsed
var _package_ = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString());

console.log(CONF)

const LOCAL = (!process.env.DB_SERVER || CONF.DEFAULT_DB_SERVER.includes("127.0.0.1"))

const config = {
  PORT: process.env.PORT || CONF.DEFAULT_PORT,
  DB_SERVER: process.env.DB_SERVER || CONF.DEFAULT_DB_SERVER,
  WEB_SERVER: CONF.DEFAULT_WEB_SERVER,
  VERSION: _package_.version,
  CACHE_SERVER: (LOCAL && CONF.CACHE_SERVER == "true") ? true : false,
  PLUGINS: {
    GOOGLE_ANALYTICS: {
      BASE_URL: CONF.PLUGINS_GOOGLE_ANALYTICS_BASE_URL,
      TRACK_ID: CONF.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
    }
  },
  LOCAL: LOCAL
}



export default config;